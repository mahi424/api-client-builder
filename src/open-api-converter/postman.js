const postmanToOpenApi = require('postman-to-openapi');
const yaml = require('js-yaml');

async function convertPostmanToSpec(postmanCollectionPath) {
    try {
        // Convert Postman to OpenAPI without saving
        const yamlContent = await postmanToOpenApi(postmanCollectionPath, null, {
            defaultTag: 'General'
        });
        return yamlContent;
    } catch (error) {
        throw new Error(`Failed to convert Postman collection: ${error.message}`);
    }
}

module.exports = convertPostmanToSpec;


/* (async () => {
    const path = require('path');
    const inputDir = path.join(__dirname, '../../', 'input/samples/');
    const s = await convertPostmanToSpec(inputDir + 'postman-collection.json')
    console.log(s)
})() */
