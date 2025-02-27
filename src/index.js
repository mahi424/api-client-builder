const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const convertToOpenAPI = require('./open-api-converter');

/**
 * Generates an API client from various input sources
 * @param {Object} options Configuration options
 * @param {string} options.input Path to input file (Postman collection, OpenAPI spec, etc)
 * @param {string} options.inputType Type of input ('postman', 'openapi', 'curl', 'raml', 'blueprint')
 * @param {string} options.language Target programming language for the client
 * @param {string} options.output Output directory for generated client
 */
async function generateApiClient(options) {
    const { input, inputType, language, output } = options;
    const tempSpecPath = path.join(process.cwd(), 'temp-openapi.yaml');

    try {
        // Convert to OpenAPI spec
        const openApiSpec = await convertToOpenAPI(input, inputType);
        
        // Save to temporary file
        fs.writeFileSync(tempSpecPath, openApiSpec);
        
        // Determine generator type based on language
        const generatorMap = {
            typescript: 'typescript-axios',
            python: 'python',
            java: 'java',
            go: 'go',
            // Add more language mappings as needed
        };

        const generator = generatorMap[language.toLowerCase()] || language;
        
        // Generate client using OpenAPI Generator
        const command = `npx @openapitools/openapi-generator-cli generate \
            -i ${tempSpecPath} \
            -g ${generator} \
            -o ${output} `;

            `\
            --skip-validate-spec \
            --enable-post-process-file \
            --global-property=skipFormModel=false \
            --additional-properties=supportsES6=true,withSeparateModelsAndApi=true`
        console.log(command);
        execSync(command, { stdio: 'inherit' });
        
        console.log(`Successfully generated ${language} API client in ${output}`);
        
    } catch (error) {
        throw new Error(`Failed to generate client: ${error.message}`);
    } finally {
        // Clean up temporary file
        if (fs.existsSync(tempSpecPath)) {
            fs.unlinkSync(tempSpecPath);
        }
    }
}

module.exports = generateApiClient;