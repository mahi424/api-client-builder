const convertPostmanToSpec = require('./postman');
const convertSwaggerToSpec = require('./swagger');
const convertCurlToSpec = require('./curl');
const fs = require('fs');

async function convertToOpenAPI(input, inputType) {
    switch (inputType.toLowerCase()) {
        case 'postman':
            return await convertPostmanToSpec(input);
        case 'curl':
            const curlCommand = fs.readFileSync(input, 'utf8').trim();
            return await convertCurlToSpec(curlCommand);
        case 'openapi':
        case 'swagger':
            return convertSwaggerToSpec(input);
        default:
            throw new Error(`Unsupported input type: ${inputType}`);
    }
}

module.exports = convertToOpenAPI;