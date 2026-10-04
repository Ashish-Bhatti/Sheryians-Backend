import 'dotenv/config';
import { ChatOllama } from "@langchain/ollama";
import { listFiles, readFile, updateFiles } from './tool.js';
import { createAgent } from 'langchain';

const model = new ChatOllama({
    model: "qwen2.5-coder:7b",
    temperature: 0,
});

const agent = createAgent({
    model,
    tools: [listFiles,readFile],

});

const result = await agent.invoke({
    messages: [
        {
            role: "user",
            content: "List all the files in the project"
        }
    ]
});

console.dir(result, { depth: null });