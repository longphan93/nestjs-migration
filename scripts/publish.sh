#!/bin/bash

echo "Installing dependencies..."
npm ci

echo "Building the package..."
npm run build:publish

cd dist

PACKAGE_NAME=$(node -p "require('./package.json').name")
PACKAGE_VERSION=$(node -p "require('./package.json').version")

echo "Setting up .npmrc for GitHub Packages..."

echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" > .npmrc
echo "@${GITHUB_REPOSITORY_OWNER}:registry=https://npm.pkg.github.com" >> .npmrc

echo "Checking if ${PACKAGE_NAME}@${PACKAGE_VERSION} is already published..."

if npm view "${PACKAGE_NAME}"@"${PACKAGE_VERSION}" --registry https://npm.pkg.github.com > /dev/null 2>&1; then
  echo "Version ${PACKAGE_VERSION} already published. Skipping publish."
  exit 0
fi

echo "Publishing ${PACKAGE_NAME}@${PACKAGE_VERSION}..."

npm publish --registry https://npm.pkg.github.com

echo "✅ Published successfully."