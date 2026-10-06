- packages
1. npm i express morgan langchain @langchain/mistralai @langchain/langgraph dotenv
2. npm i axios
3. npm i zod
4. npm i https

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