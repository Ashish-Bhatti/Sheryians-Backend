import 'dotenv/config';
import { ChatOllama } from "@langchain/ollama";
import { listFiles, readFile, updateFiles } from './tool.js';
import { createAgent } from 'langchain';

const model = new ChatGoogleGenerativeAI({
    model: 'gemini-3.8-flash',
    apiKey: process.env.GOOGLE_API_KEY,
});

const agent = createAgent({
    model,
    tools: [listFiles,readFile],

});

await agent.invoke({
    messages: [
        {
            role: 'user',
            content: 'Read src/App.jsx file and send me the content of the file. If the file is not present, create a new file named src/App.js and add the following code to it: \n\nimport React from "react";\n\nfunction App() {\n  return (\n    <div className="App">\n      <h1>Hello, World!</h1>\n    </div>\n  );\n}\n\nexport default App;',
        },
    ],
});
