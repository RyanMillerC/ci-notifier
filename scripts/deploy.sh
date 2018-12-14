#!/bin/bash
#
# Deploy application using serverless, ONLY if on master branch
#

if [[ ${TRAVIS_BRANCH} = 'master' ]] ; then
  echo "Deploying application"
  npm install -g serverless
  sls deploy
  echo "Deploying application...done!"
else
  echo "Branch is not master. Nothing to do."
fi
