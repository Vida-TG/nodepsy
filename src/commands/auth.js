const jwt = require('jsonwebtoken');
const chalk = require('chalk');

const auth = {
  generate: async (options) => {
    try {
      const payload = {
        user: options.user || 'admin',
        role: 'admin',
        iat: Math.floor(Date.now() / 1000)
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET || 'default-secret-key');
      
      console.log(chalk.green('\n✨ Token generated successfully!\n'));
      console.log(chalk.blue('Token:'));
      console.log(chalk.white(token + '\n'));
    } catch (error) {
      console.error(chalk.red('Failed to generate token:'), error);
      process.exit(1);
    }
  },

  verify: async (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret-key');
      
      console.log(chalk.green('\n✨ Token verified successfully!\n'));
      console.log(chalk.blue('Decoded token:'));
      console.log(chalk.white(JSON.stringify(decoded, null, 2) + '\n'));
    } catch (error) {
      console.error(chalk.red('\n❌ Invalid token\n'));
      process.exit(1);
    }
  }
};

module.exports = { auth }; 