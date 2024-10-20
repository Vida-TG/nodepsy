const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const generateApi = async (resource, options) => {
  try {
    if (options.crud) {
      await generateCrudApi(resource);
      console.log(chalk.green(`\n✨ CRUD API for ${resource} generated successfully!\n`));
    } else {
      console.log(chalk.yellow('\nPlease specify API type (--crud or --graphql)\n'));
    }
  } catch (error) {
    console.error(chalk.red('Failed to generate API:'), error);
    process.exit(1);
  }
};

const generateCrudApi = async (resource) => {
  const name = resource.toLowerCase();
  
  const controllerContent = `const ${name} = require('../models/${name}');

exports.getAll = async (req, res) => {
  try {
    const items = await ${name}.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await ${name}.findById(req.params.id);
    if (item) res.json(item);
    else res.status(404).json({ message: '${name} not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const item = new ${name}(req.body);
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await ${name}.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await ${name}.findByIdAndDelete(req.params.id);
    res.json({ message: '${name} deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};`;

  const routeContent = `const express = require('express');
const router = express.Router();
const controller = require('../controllers/${name}');

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;`;

  await fs.writeFile(path.join(process.cwd(), 'src', 'controllers', `${name}.js`), controllerContent);
  await fs.writeFile(path.join(process.cwd(), 'src', 'routes', `${name}.js`), routeContent);
};

module.exports = { generateApi }; 