const { OpenAI } = require('openai');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function enrichOpenApiSpec(spec) {
    console.log(process.env.OPENAI_API_KEY)
    if (!process.env.OPENAI_API_KEY) return spec;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are an API expert. Analyze the OpenAPI spec and: 1) Add detailed descriptions 2) Identify relationships between endpoints 3) Generate a mermaid graph showing the API flow"
                },
                {
                    role: "user",
                    content: `Analyze this OpenAPI spec and enhance it: ${spec}`
                }
            ]
        });
        console.log(completion)
        const enhancedSpec = JSON.parse(completion.choices[0].message.content.split('```yaml')[1].split('```')[0]);
        const mermaidGraph = completion.choices[0].message.content.split('```mermaid')[1].split('```')[0];

        // Save the mermaid graph
        fs.writeFileSync(
            path.join(path.dirname(tempSpecPath), 'api-flow.md'),
            `# API Flow Diagram\n\n\`\`\`mermaid${mermaidGraph}\`\`\``
        );

        return enhancedSpec;
    } catch (error) {
        console.warn('AI enhancement failed, using original spec:', error.message);
        return spec;
    }
}



module.exports = enrichOpenApiSpec;