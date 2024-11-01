const faker = require('faker');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const generateMockData = async (options) => {
  try {
    const count = parseInt(options.count) || 10;
    const users = Array.from({ length: count }, () => ({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: faker.random.arrayElement(['user', 'admin']),
      createdAt: faker.date.past(),
      profile: {
        avatar: faker.internet.avatar(),
        bio: faker.lorem.paragraph(),
        location: faker.address.city()
      }
    }));

    const outputPath = path.join(process.cwd(), 'src', 'mock', 'users.json');
    await fs.ensureDir(path.dirname(outputPath));
    await fs.writeFile(outputPath, JSON.stringify(users, null, 2));

    console.log(chalk.green(`\n✨ Generated ${count} mock users!\n`));
    console.log(chalk.blue('Mock data saved to:'), chalk.white('src/mock/users.json\n'));
  } catch (error) {
    console.error(chalk.red('\nFailed to generate mock data:'), error.message);
    process.exit(1);
  }
};

module.exports = { generateMockData }; 