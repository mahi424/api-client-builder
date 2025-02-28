const inquirer = require('inquirer');
const { supportedLanguages, supportedInputTypes, validateAndNormalizeOptions } = require('./options');

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
            name: 'inputType',
            message: 'What type of API specification is it?',
            choices: supportedInputTypes,
            default: 'openapi'
        },
        {
            type: 'list',
            name: 'language',
            message: 'Which programming language would you like to generate the client for?',
            choices: supportedLanguages,
            default: 'typescript'
        },
        {
            type: 'input',
            name: 'output',
            message: 'Where would you like to output the generated client?',
            default: './generated-client'
        }
    ];

    const answers = await inquirer.prompt(questions);
    return validateAndNormalizeOptions(answers);
}

module.exports = promptUser;