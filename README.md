# ci-notifier :robot:

[![Travis (.org)](https://img.shields.io/travis/RyanMillerC/ci-notifier.svg)](https://travis-ci.org/RyanMillerC/ci-notifier)
[![GitHub](https://img.shields.io/github/license/RyanMillerC/ci-notifier.svg)](https://github.com/RyanMillerC/ci-notifier/blob/master/LICENSE)
[![Made with Probot](https://img.shields.io/badge/Made%20with-Probot-blue.svg)](https://github.com/probot/probot)

> GitHub bot will comment on pull requests when a commit from that PR fails CI. It is available [here](https://github.com/apps/ci-notifier).

![Screenshot](/docs/ci-notifier-screenshot.png)

## Description

Ci-notifier is a GitHub [Probot](https://github.com/probot/probot) App to comment on pull requests when a commit from that PR fails continuous integration.

This app uses the [Probot](https://github.com/probot/probot) framework and [@Probot/serverless-lambda](https://github.com/probot/serverless-lambda). The production application is hosted on [AWS](https://aws.amazon.com/) using [Lambda](https://aws.amazon.com/lambda/)/[API Gateway](https://aws.amazon.com/api-gateway/) and is continuously deployed through [Travis CI](https://travis-ci.org/RyanMillerC/ci-notifier) using the [Serverless](https://github.com/serverless/serverless) Framework.

## Setup

To set up ci-notifier for your repo,

1. Enable ci-notifier for your repo [here](https://github.com/apps/ci-notifier).

That's it! Next time a commit fails your CI process, ci-notifier will comment with more info.

## Issues/Comments

If you experience any problems getting this bot working, open an issue and I'll get back with you.

## License

[ISC](LICENSE) © 2018 Ryan Miller <ryan@devopsmachine.com>.

Logo provided by [icons8](https://icons8.com) under [CC BY-ND 3.0](https://icons8.com/license/).
