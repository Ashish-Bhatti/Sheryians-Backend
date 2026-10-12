- packages
1. npm i express morgan langchain @langchain/mistralai @langchain/langgraph dotenv
2. npm i axios
3. npm i zod
4. npm i https
5. npm install @langchain/openrouter

all npm models
    @langchain/google-genai": "^2.3.2",
    "@langchain/groq": "^1.3.1",
    "@langchain/langgraph": "^1.4.19",
    "@langchain/mistralai": "^1.2.0",
    "@langchain/ollama": "^1.3.0",

# AI Agent → Sandbox
- Added an LLM-powered coding agent using LangChain.
- Agent can inspect and automatically update files in the sandbox using tools.
- Added list_files, read_files, and update_files tools.
- Currently using a hard-coded sandbox ID/hostname for testing.
- Sandbox ID will be made dynamic later.
- Agent can now receive a request and automatically modify the sandbox code based on it.

# Keep in Mind
- createAgent expects messages, not message.{ messages: [...] }
- Our API accepts:{ "message": "your request" }

  and the router converts it into LangChain's messages format.
- Don't assume the agent will automatically use every tool. The system prompt and tool descriptions strongly influence tool usage.
- For simple changes where the file is already known, avoid unnecessary list_files calls.
- update_files must be called for any actual code change; a normal AI response does not mean the file was updated.
- Groq has a token-per-minute limit, so unnecessary file reads/tool calls can quickly cause 429 errors.
- The sandbox ID/hostname is currently hard-coded. It needs to become dynamic later.
- Local sandbox HTTPS currently uses:rejectUnauthorized: false

  This is okay for local development but should not be used in production.
- Always check the actual agent response and tool calls when debugging instead of assuming the tool failed.

# What we did today
- Set up the project dependencies for the AI agent backend: Express, Morgan, LangChain, Mistral, LangGraph, dotenv, axios, zod, and OpenRouter support.
- Integrated LangChain/LangGraph-based AI orchestration to let the agent process requests and take actions inside the sandbox environment.
- Added a sandbox workflow where the agent can inspect files, read project contents, and update code based on the user's instructions.
- Implemented streaming support using LangGraph, allowing the AI to log its work in real time while processing a request.
- Added Server-Sent Events (SSE) support so the client can receive live progress updates from the server during AI execution.
- Documented important implementation notes, including message format expectations, tool-calling behavior, rate-limit concerns, and local HTTPS config details for development.
- Confirmed the app flow: user sends a request, the server passes it to the agent, the agent executes tools, and the system streams progress back to the user in real time.

# work

- we added stream which comes with langgraph to log what is ai is doing it's like console.log but with langgraph streaming we can do this with writer

- Server-Sent Events (SSE) is a server push technology that enables a web page to receive automatic, real-time updates from a server over a single, persistent HTTP connection. Like user send a request once on server and server sent response of what it is doing like telling user about it's every action