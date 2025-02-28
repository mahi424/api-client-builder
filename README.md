# API Client Builder

A versatile tool to generate API clients from various API specification formats. Convert Postman Collections, OpenAPI/Swagger specs, or cURL commands into type-safe API clients for multiple programming languages.

## Features

- **Multiple Input Formats**:
  - OpenAPI/Swagger Specifications
  - Postman Collections
  - cURL Commands
  - (Coming soon: RAML, API Blueprint)

- **Supported Output Languages**:
  - TypeScript (with Axios)
  - Python
  - Java
  - Go
  - C#
  - JavaScript

- **AI-Enhanced Specifications**:
  - Enriched API documentation
  - Relationship mapping between endpoints
  - Visual API flow diagrams (Mermaid)

## Installation

```bash
# Clone the repository
git clone https://github.com/mahi424/api-client-builder.git

# Install dependencies
cd api-client-builder
npm install

# Link globally (for CLI usage)
npm link
```

## Usage

### CLI Mode

```bash
api-client-builder -i ./swagger.json -t openapi -l typescript -o ./client
```

Options:
- `-i, --input`: Path to input file
- `-t, --type`: Input type (openapi, postman, curl)
- `-l, --language`: Target language
- `-o, --output`: Output directory (default: ./generated-client)

### Interactive Mode

```bash
api-client-builder
```

Follow the prompts to:
1. Select input file
2. Specify input type
3. Choose target language
4. Set output directory

### NPM Scripts

```bash
# Run tests
npm run test

# Generate client (using default options)
npm run generate

# Start interactive mode
npm run interactive
```

## Examples

### Converting Postman Collection

```bash
api-client-builder -i ./collections/api.postman.json -t postman -l typescript -o ./typescript-client
```

### Converting Swagger/OpenAPI

```bash
api-client-builder -i ./specs/swagger.json -t openapi -l python -o ./python-client
```

### Converting cURL Command

```bash
api-client-builder -i ./curls/request.txt -t curl -l java -o ./java-client
```

## Project Structure

```
api-client-builder/
├── src/
│   ├── cli/                 # CLI implementation
│   ├── client-generator/    # Client generation logic
│   ├── open-api-converter/  # Format converters
│   └── spec-enricher/       # AI enhancement
├── input/
│   └── samples/            # Example input files
└── generated-clients/      # Generated output
```

## Dependencies

- @openapitools/openapi-generator-cli: OpenAPI client generation
- postman-to-openapi: Postman collection conversion
- curlconverter: cURL command parsing
- openai: AI-powered spec enhancement
- commander: CLI implementation
- inquirer: Interactive prompts

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

GPL v3
