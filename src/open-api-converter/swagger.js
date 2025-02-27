const yaml = require('js-yaml');
const fs = require('fs');

function convertSwaggerToSpec(swaggerPath) {
    try {
        const content = fs.readFileSync(swaggerPath, 'utf8');
        let parsedSpec;

        // Try parsing as YAML first, then JSON
        try {
            parsedSpec = yaml.load(content);
        } catch (e) {
            parsedSpec = JSON.parse(content);
        }

        // Convert to YAML
        const yamlContent = yaml.dump(parsedSpec, {
            indent: 2,
            lineWidth: -1
        });

        return yamlContent;
    } catch (error) {
        throw new Error(`Failed to convert Swagger spec: ${error.message}`);
    }
}

module.exports = convertSwaggerToSpec;


/* (() => {
    const path = require('path');
    const inputDir = path.join(__dirname, '../../', 'input/samples/');
    console.log(convertSwaggerToSpec(inputDir + 'swagger.json'))
})() */