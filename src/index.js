#!/usr/bin/env node

const { program } = require('commander');
const { newProject } = require('./commands/project');
const { addModel } = require('./commands/model');
const { generateApi } = require('./commands/generate');
const { auth } = require('./commands/auth');
const { env } = require('./commands/env');
const { setupCI } = require('./commands/ci');
const { generateMockData } = require('./commands/mock');
const { deploy } = require('./commands/deploy');

program
  .version('0.0.1')
  .description('Node.js project generator and user management CLI');

// Project Setup Commands
program
  .command('new <projectName>')
  .option('--stack <stack>', 'technology stack to use', 'node-mongo')
  .description('Create a new backend project')
  .action(newProject);

program
  .command('generate')
  .command('api <resource>')
  .option('--crud', 'Generate CRUD endpoints')
  .option('--graphql', 'Generate GraphQL API')
  .description('Generate API endpoints')
  .action(generateApi);

program
  .command('add')
  .command('model <name>')
  .option('--fields <fields>', 'Model fields in format "field:type, field:type"')
  .description('Add a new database model')
  .action(addModel);

program
  .command('auth')
  .command('generate')
  .option('--user <type>', 'User type for token')
  .description('Generate JWT token')
  .action(auth.generate);

program
  .command('auth')
  .command('verify <token>')
  .description('Verify JWT token')
  .action(auth.verify);

program
  .command('env')
  .command('set <keyValue>')
  .description('Set environment variable')
  .action(env.set);

program
  .command('setup')
  .command('ci')
  .option('--github', 'Setup GitHub Actions')
  .description('Setup CI/CD pipeline')
  .action(setupCI);

program
  .command('auth')
  .command('mock')
  .option('--count <number>', 'Number of mock users to create', '10')
  .description('Generate mock users for testing')
  .action(generateMockData);

program
  .command('deploy')
  .option('--platform <platform>', 'Platform to deploy to (heroku)')
  .description('Deploy the application')
  .action(deploy);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  console.log('Welcome to nodepsy! Run nodepsy --help to see available commands.');
} 