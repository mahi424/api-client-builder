#!/usr/bin/env node

const { program } = require('commander');
const generateApiClient = require('./index');
const path = require('path');

program
  .name('api-client-builder')
  .description('Generate API clients from various API documentation sources')
  .version('1.0.0')
  .requiredOption('-i, --input <path>', 'Path to input file (Postman collection, OpenAPI spec, etc)')
  .requiredOption('-t, --type <type>', 'Type of input (postman, openapi, curl, raml, blueprint)')
  .requiredOption('-l, --language <language>', 'Target programming language for the client')
  .option('-o, --output <directory>', 'Output directory for generated client', './api-client');

program.parse();

const options = program.opts();

// Convert relative paths to absolute
options.input = path.resolve(options.input);
options.output = path.resolve(options.output);

// Generate the API client
generateApiClient({
  input: options.input,
  inputType: options.type,
  language: options.language,
  output: options.output
}).catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});