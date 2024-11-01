const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const setupCI = async (options) => {
  try {
    if (options.github) {
      await setupGithubActions();
      console.log(chalk.green('\n✨ GitHub Actions CI/CD setup completed!\n'));
    } else {
      console.log(chalk.yellow('\nPlease specify CI platform (--github)\n'));
    }
  } catch (error) {
    console.error(chalk.red('\nFailed to setup CI:'), error.message);
    process.exit(1);
  }
};

const setupGithubActions = async () => {
  const workflowsDir = path.join(process.cwd(), '.github', 'workflows');
  await fs.ensureDir(workflowsDir);

  const ciConfig = `name: Node.js CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: \${{ matrix.node-version }}
    - run: npm ci
    - run: npm run build --if-present
    - run: npm test`;

  await fs.writeFile(path.join(workflowsDir, 'node.js.yml'), ciConfig);
};

module.exports = { setupCI }; 