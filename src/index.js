#!/usr/bin/env node

const { program } = require('commander');
const { newProject } = require('./commands/project');
const { addModel } = require('./commands/model');

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
  .command('add')
  .command('model <name>')
  .option('--fields <fields>', 'Model fields in format "field:type, field:type"')
  .description('Add a new database model')
  .action(addModel);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  console.log('Welcome to nodepsy! Run nodepsy --help to see available commands.');
} 