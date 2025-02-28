const { program } = require('commander');
const { validateAndNormalizeOptions } = require('./options');

function parseCommandLine() {
    program
        .name('api-client-builder')
        .description('Generate API clients from various API documentation sources')
        .version('1.0.0')
        .requiredOption('-i, --input <path>', 'Path to input file (Postman collection, OpenAPI spec, etc)')
        .requiredOption('-t, --type <type>', 'Type of input (postman, openapi, curl, raml, blueprint)')
        .requiredOption('-l, --language <language>', 'Target programming language for the client')
        .option('-o, --output <directory>', 'Output directory for generated client', './generated-client');

    program.parse();

    const options = program.opts();
    return validateAndNormalizeOptions({
        input: options.input,
        inputType: options.type,
        language: options.language,
        output: options.output
    });
}

module.exports = parseCommandLine;