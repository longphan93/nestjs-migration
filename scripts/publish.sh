#!/bin/bash

echo "Installing dependencies..."
npm ci

echo "Building the package..."
npm run build:publish
cd dist

PACKAGE_NAME=$(node -p "require('./package.json').name.split('/')[1]")
PACKAGE_VERSION=$(node -p "require('./package.json').version")
NPM_PACKAGE_SCOPE=$(node -p "require('./package.json').name.split('/')[0]")
NPM_REGISTRY="https://${CI_SERVER_HOST}/api/v4/projects/${CI_PROJECT_ID}/packages/npm/"

echo "Setting up .npmrc for GitLab registry..."
echo "${NPM_PACKAGE_SCOPE}:registry=${NPM_REGISTRY}" > .npmrc
echo "//${CI_SERVER_HOST}/api/v4/projects/${CI_PROJECT_ID}/packages/npm/:_authToken=${CI_JOB_TOKEN}" >> .npmrc

echo "Checking if ${PACKAGE_NAME}@${PACKAGE_VERSION} is already published..."
if npm view "${PACKAGE_NAME}"@"${PACKAGE_VERSION}" --registry "${NPM_REGISTRY}" > /dev/null 2>&1; then
  echo "Version ${PACKAGE_VERSION} already published. Skipping publish."
  exit 0
fi

echo "Publishing ${PACKAGE_NAME}@${PACKAGE_VERSION}..."
npm publish --registry "${NPM_REGISTRY}"
echo "✅ Published successfully."