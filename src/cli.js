#!/usr/bin/env node

import inquirer from 'inquirer';
import generateMvcStructure from './generator.js'; // Include .js extension

async function init() {
  const { language, addSwagger } = await inquirer.prompt([
    {
      type: 'list',
      name: 'language',
      message: 'Which language are you using?',
      choices: ['JavaScript', 'TypeScript'],
    },
    {
      type: 'confirm',
      name: 'addSwagger',
      message: 'Do you want to add Swagger?',
      default: false,
    },
  ]);

  const basePath = process.argv[2] || process.cwd();
  generateMvcStructure(basePath, language, addSwagger);
}

init();
