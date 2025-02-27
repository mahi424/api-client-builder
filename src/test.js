const fs = require('fs');
const path = require('path');
const generateApiClient = require('./index');

// Create test directories if they don't exist
const inputDir = path.join(__dirname, '..', 'input/samples');
const outputDir = path.join(__dirname, '..', 'generated-clients');
const testDataDir = path.join(__dirname, '__fixtures__');

if (!fs.existsSync(inputDir)) fs.mkdirSync(inputDir, { recursive: true });
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
if (!fs.existsSync(testDataDir)) fs.mkdirSync(testDataDir, { recursive: true });






async function testApiClientGenerator() {
    try {
        console.log('Starting API client generation tests...\n');

        // Get all sample files
        // const samples = fs.readdirSync(inputDir);
        const samples = [ 
            // 'postman-collection.json', 
            // 'swagger.json' ,
            'curl.txt'
        ]
        console.log('samples', samples)
        // Define supported languages
        const languages = ['python', 'typescript', 'java', 'go'];
        
        // Test each sample with each language
        for (const sample of samples) {
            const inputType = sample.includes('postman') ? 'postman' : 
                            sample.includes('swagger') || sample.includes('openapi') ? 'openapi' : 
                            'curl';
            
            console.log(`\nTesting ${sample} ${inputType} conversion:`);
            // if(sample.includes('postman')) return;
            
            for (const language of languages) {
                console.log(`\n  Converting to ${language}...`);
                try {
                    await generateApiClient({
                        input: path.join(inputDir, sample),
                        inputType,
                        language,
                        output: path.join(outputDir, `${language}-${path.parse(sample).name}`)
                    });
                    
                    // Verify client generation
                    const outputPath = path.join(outputDir, `${language}-${path.parse(sample).name}`);
                    if (fs.existsSync(outputPath)) {
                        console.log(`  ✓ ${language} client generated successfully`);
                    }
                } catch (error) {
                    console.log(`  ✗ ${language} client generation failed:`, error.message);
                }
            }
        }

        // Test error handling with invalid input
    /*     console.log('\nTesting error handling...');
        try {
            await generateApiClient({
                input: path.join(inputDir, 'nonexistent.json'),
                inputType: 'openapi',
                language: 'python',
                output: path.join(outputDir, 'error-client')
            });
        } catch (error) {
            console.log('✓ Error handled successfully:', error.message, '\n');
        } */

    } catch (error) {
        console.error('\nTest failed:', error.message);
        process.exit(1);
    }
}

// Run the tests
console.log('Setting up test environment...\n');
testApiClientGenerator().then(() => {
    console.log('\nAll tests completed.');
});