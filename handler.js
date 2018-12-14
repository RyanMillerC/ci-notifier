/**
 * NodeJS handler using @probot/serverless-lambda to wrap Probot
 * for AWS Lambda.
 **/

const serverlessLambda = require('@probot/serverless-lambda')
const appFn = require('./')
module.exports.main = serverlessLambda.serverless(appFn)
