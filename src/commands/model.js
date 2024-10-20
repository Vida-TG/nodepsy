const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const addModel = async (name, options) => {
  try {
    const fields = parseFields(options.fields);
    const modelContent = generateModelContent(name, fields);
    
    await fs.writeFile(
      path.join(process.cwd(), 'src', 'models', `${name.toLowerCase()}.js`),
      modelContent
    );

    console.log(chalk.green(`\n✨ Model ${name} created successfully!\n`));

  } catch (error) {
    console.error(chalk.red('Failed to create model:'), error);
    process.exit(1);
  }
};

const parseFields = (fieldsString) => {
  if (!fieldsString) return {};
  
  return fieldsString.split(',')
    .map(field => field.trim())
    .reduce((acc, field) => {
      const [name, type] = field.split(':').map(s => s.trim());
      acc[name] = type;
      return acc;
    }, {});
};

const generateModelContent = (name, fields) => {
  const fieldDefinitions = Object.entries(fields)
    .map(([fieldName, fieldType]) => `  ${fieldName}: { type: ${fieldType} }`)
    .join(',\n');

  return `const mongoose = require('mongoose');

const ${name}Schema = new mongoose.Schema({
${fieldDefinitions}
}, {
  timestamps: true
});

module.exports = mongoose.model('${name}', ${name}Schema);`;
};

module.exports = { addModel }; 