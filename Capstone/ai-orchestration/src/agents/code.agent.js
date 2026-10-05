import 'dotenv/config';
import { ChatGroq } from "@langchain/groq";
import { listFiles, readFile, updateFiles } from './tool.js';
import { createAgent } from 'langchain';

const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    temperature: 0,
    apiKey: process.env.GROQ_API_KEY,
});
const agent = createAgent({
    model,
    tools: [listFiles,readFile,updateFiles],

    systemPrompt: `
You are a coding agent.

Be token efficient.

- List files first when necessary.
- Read only files directly relevant to the user's request.
- Never read unrelated files.
- Do not read package.json unless the task requires it.
- Do not reread a file you already have.
- After understanding the relevant files, make the change using update_files.
- Complete tasks with the minimum number of model and tool calls.
`,
});

await agent.invoke({
    messages: [
        {
            role: 'user',
            content: 'list all the files in the project directory and read the contents of the file named "example.txt".',
        },
    ],
});
