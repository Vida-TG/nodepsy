#!/usr/bin/env node

const { program } = require('commander');

program
  .version('0.0.1')
  .description('Node.js project generator and user management CLI');

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  console.log('Welcome to nodepsy! Run nodepsy --help to see available commands.');
} 