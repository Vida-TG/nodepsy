const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const env = {
  set: async (keyValue) => {
    try {
      const [key, value] = keyValue.split('=');
      if (!key || !value) {
        throw new Error('Invalid format. Use KEY=VALUE format');
      }

      const envPath = path.join(process.cwd(), '.env');
      let envContent = '';
      
      if (await fs.pathExists(envPath)) {
        envContent = await fs.readFile(envPath, 'utf8');
      }

      const envLines = envContent.split('\n').filter(Boolean);
      const keyExists = envLines.some((line, index) => {
        if (line.startsWith(`${key}=`)) {
          envLines[index] = `${key}=${value}`;
          return true;
        }
        return false;
      });

      if (!keyExists) {
        envLines.push(`${key}=${value}`);
      }

      await fs.writeFile(envPath, envLines.join('\n') + '\n');
      
      console.log(chalk.green(`\n✨ Environment variable ${key} set successfully!\n`));
    } catch (error) {
      console.error(chalk.red('\nFailed to set environment variable:'), error.message);
      process.exit(1);
    }
  }
};

module.exports = { env }; 