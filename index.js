module.exports = app => {
  app.log('Yay, the app was loaded!')

  app.on('status', async context => {
    app.log('Received status webhook:', context.payload.state)
    if (context.payload.state === 'failure') {
      let config
      try {
        config = await context.config('ci-notifier.yml')
      } catch (e) {
        console.error('Unable to open ".github/ci-notifier.yml".')
        process.exit(1)
      }

      let { commentText } = config
      if (!commentText) {
        console.error('Unable to pull required settings from ".github/ci-notifier.yml".')
        process.exit(1)
      }

      const commitSha = context.payload.commit.sha
      const repoInfo = {
        owner: context.payload.repository.owner.login,
        repo: context.payload.repository.name
      }
      const pullRequests = await context.github.pullRequests.list(repoInfo)
      const openPullRequests = pullRequests.data.filter(p => p.closed_at === null)
      const promisedCommitData = openPullRequests.map(async (p) => {
        const commits = await context.github.pullRequests.listCommits({
          ...repoInfo,
          number: p.number
        })
        p.commits = commits.data
        return p
      })
      const pullRequestsWithCommits = await Promise.all(promisedCommitData)
      const shaMatchedPr = pullRequestsWithCommits.find(p => {
        return p.commits.find(c => c.sha === commitSha)
      })
      if (shaMatchedPr) {
        const pullRequestId = shaMatchedPr.number
        const branchName = shaMatchedPr.head.ref
        const commitShaShort = commitSha.substring(0, 7)

        const templateMap = {
          branchName,
          commitSha,
          commitShaShort,
          htmlCommitLink: `https://github.com/${repoInfo.owner}/${repoInfo.repo}/pull/${pullRequestId}/commits/${commitSha}`,
          pullRequestId,
          repoName: repoInfo.repo,
          repoOwner: repoInfo.owner
        }
        Object.keys(templateMap).forEach(k => {
          commentText = commentText.replace(`{{${k}}}`, templateMap[k])
        })
        const commentPayload = {
          ...repoInfo,
          number: pullRequestId,
          body: commentText
        }
        app.log('Calling GitHub createComment API')
        await context.github.issues.createComment(commentPayload)
      } else {
        app.log(commitSha, 'did not match any open PR')
      }
    } else {
      app.log('Nothing to do')
    }
    // app.log(await context.github.request('GET ' + context.payload.commit.comments_url))
    app.log('done.')
    return null
  })
}
