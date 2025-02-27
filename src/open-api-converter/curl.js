const { exec } = require('child_process');
const yaml = require('js-yaml');
const curlconverter = require('curlconverter');

async function convertCurlToSpec(curlCommand) {
    try {
        // Parse the curl command
        const parsed = curlconverter.toJsonString(curlCommand);
        const curlData = JSON.parse(parsed);
        console.log(curlData)
        // Create OpenAPI specification
        curlData.url = new URL(curlData.url)
        const openApiSpec = {
            openapi: '3.0.0',
            info: {
                title: 'API from cURL',
                version: '1.0.0',
                description: 'API specification generated from cURL command'
            },
            paths: {
                [curlData.url.pathname]: {
                    [curlData.method.toLowerCase()]: {
                        summary: `${curlData.method} request to ${curlData.url.pathname}`,
                        parameters: [
                            ...Object.entries(curlData.query || {}).map(([name, value]) => ({
                                name,
                                in: 'query',
                                schema: { type: 'string' },
                                example: value
                            })),
                            ...Object.entries(curlData.headers || {}).map(([name, value]) => ({
                                name,
                                in: 'header',
                                schema: { type: 'string' },
                                example: value
                            }))
                        ],
                        requestBody: curlData.data ? {
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        example: typeof curlData.data === 'string' ?
                                            JSON.parse(curlData.data) : curlData.data
                                    }
                                }
                            }
                        } : undefined,
                        responses: {
                            '200': {
                                description: 'Successful response',
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: 'object'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

        // Convert to YAML
        const yamlContent = yaml.dump(openApiSpec, {
            indent: 2,
            lineWidth: -1
        });
        // console.log(yamlContent)
        return yamlContent;
    } catch (error) {
        throw new Error(`Failed to convert cURL command: ${error.message}`);
    }
}

module.exports = convertCurlToSpec;

/* (() => {
    const curl = `curl -X POST "https://api.example.com/users?role=admin" \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com"}'`;

    convertCurlToSpec(curl).then(spec => console.log(spec));
})() */