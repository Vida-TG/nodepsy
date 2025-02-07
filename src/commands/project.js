const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

const newProject = async (projectName, options) => {
  const spinner = ora('Creating new project...').start();

  try {
    const projectPath = path.join(process.cwd(), projectName);
    
    // Create project
    await fs.ensureDir(projectPath);
    
    spinner.text = 'Setting up directory structure...';
    const dirs = [
      'src',
      'src/controllers',
      'src/models',
      'src/routes',
      'src/config'
    ];

    for (const dir of dirs) {
      await fs.ensureDir(path.join(projectPath, dir));
    }

    spinner.text = 'Generating configuration files...';
    const packageJson = {
      name: projectName,
      version: '1.0.0',
      description: '',
      main: 'src/app.js',
      scripts: {
        start: 'node src/app.js'
      },
      dependencies: {
        express: '^4.17.1',
        mongoose: '^6.0.12',
        cors: '^2.8.5',
        dotenv: '^10.0.0'
      }
    };

    const appJs = `
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to ${projectName} API' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`;

    await fs.writeFile(
      path.join(projectPath, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    await fs.writeFile(path.join(projectPath, 'src', 'app.js'), appJs);

    spinner.succeed(chalk.green(`Project ${projectName} created successfully!`));
    console.log(chalk.blue('Next steps:'));
    console.log(chalk.white(`  cd ${projectName}`));
    console.log(chalk.white('  npm install'));
    console.log(chalk.white('  npm start\n'));

  } catch (error) {
    spinner.fail(chalk.red('Failed to create project'));
    console.error(chalk.red('Failed to create project:'), error);
    process.exit(1);
  }
};

module.exports = { newProject }; 