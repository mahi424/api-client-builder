#!/usr/bin/env node

const inquirer = require('inquirer');
const path = require('path');
const generateApiClient = require('./index');

async function promptUser() {
  const questions = [
    {
      type: 'input',
      name: 'input',
      message: 'Enter the path to your API specification file:',
      default: './input/swagger.json'
    },
    {
      type: 'list',
      name: 'type',
      message: 'What type of API specification is it?',
      choices: ['openapi', 'postman', 'curl', 'raml', 'blueprint'],
      default: 'openapi'
    },
    {
      type: 'list',
      name: 'language',
      message: 'Which programming language would you like to generate the client for?',
      choices: ['typescript', 'javascript', 'python', 'java', 'csharp', 'go'],
      default: 'typescript'
    },
    {
      type: 'input',
      name: 'output',
      message: 'Where would you like to output the generated client?',
      default: './generated-client'
    }
  ];

  try {
    const answers = await inquirer.prompt(questions);
    
    // Convert relative paths to absolute
    answers.input = path.resolve(answers.input);
    answers.output = path.resolve(answers.output);

    // Generate the API client
    await generateApiClient({
      input: answers.input,
      inputType: answers.type,
      language: answers.language,
      output: answers.output
    });

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Start the CLI
promptUser();