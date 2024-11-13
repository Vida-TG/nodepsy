const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');

const deploy = async (options) => {
  try {
    switch (options.platform) {
      case 'heroku':
        await deployToHeroku();
        break;
      default:
        console.log(chalk.yellow('\nPlatform not supported. Currently supports: heroku\n'));
        process.exit(1);
    }
  } catch (error) {
    console.error(chalk.red('\nDeployment failed:'), error.message);
    process.exit(1);
  }
};

const deployToHeroku = async () => {
  try {
    console.log(chalk.blue('\nPreparing for Heroku deployment...\n'));

    const hasHerokuCLI = checkHerokuCLI();
    if (!hasHerokuCLI) {
      console.log(chalk.yellow('Heroku CLI not found. Please install it first:'));
      console.log(chalk.white('https://devcenter.heroku.com/articles/heroku-cli\n'));
      process.exit(1);
    }

    await generateProcfile();
    console.log(chalk.green('✓ Procfile created'));

    console.log(chalk.blue('\nNext steps:'));
    console.log(chalk.white('1. heroku login'));
    console.log(chalk.white('2. heroku create'));
    console.log(chalk.white('3. git push heroku main\n'));

  } catch (error) {
    throw new Error(`Heroku setup failed: ${error.message}`);
  }
};

const checkHerokuCLI = () => {
  try {
    execSync('heroku --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

const generateProcfile = async () => {
  const procfilePath = path.join(process.cwd(), 'Procfile');
  await fs.writeFile(procfilePath, 'web: npm start\n');
};

module.exports = { deploy }; 