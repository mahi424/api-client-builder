#!/usr/bin/env node

const generateApiClient = require('../client-generator');
const parseCommandLine = require('./command');
const promptUser = require('./interactive');

async function main() {
    try {
        // Check if running in interactive mode
        const isInteractive = process.argv.length <= 2;
        
        // Get options either from interactive prompt or command line
        const options = isInteractive ? 
            await promptUser() : 
            parseCommandLine();

        // Generate the API client
        await generateApiClient(options);

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

// Start the CLI
main();