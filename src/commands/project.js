const fs = require('fs-extra');
const path = require('path');

const newProject = async (projectName, options) => {
  try {
    const projectPath = path.join(process.cwd(), projectName);
    
    // Create project directory
    await fs.ensureDir(projectPath);
    
    // Create basic structure
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

    // Create basic package.json
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
        mongoose: '^6.0.12'
      }
    };

    await fs.writeFile(
      path.join(projectPath, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    console.log(`Project ${projectName} created successfully!`);

  } catch (error) {
    console.error('Failed to create project:', error);
    process.exit(1);
  }
};

module.exports = { newProject }; 