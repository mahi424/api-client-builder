const path = require('path');

const supportedLanguages = [
    'typescript',
    'python', 
    'java',
    'go',
    'csharp',
    'javascript'
];

const supportedInputTypes = [
    'openapi',
    'postman',
    'curl',
    'raml',
    'blueprint'
];

function validateAndNormalizeOptions(options) {
    const normalizedOptions = {
        input: path.resolve(options.input),
        inputType: options.inputType.toLowerCase(),
        language: options.language.toLowerCase(),
        output: path.resolve(options.output || './generated-client')
    };

    if (!supportedInputTypes.includes(normalizedOptions.inputType)) {
        throw new Error(`Unsupported input type: ${normalizedOptions.inputType}`);
    }

    if (!supportedLanguages.includes(normalizedOptions.language)) {
        throw new Error(`Unsupported language: ${normalizedOptions.language}`);
    }

    return normalizedOptions;
}

module.exports = {
    supportedLanguages,
    supportedInputTypes,
    validateAndNormalizeOptions
};