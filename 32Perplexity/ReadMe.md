# Additional Packages (AI Chat Application)

## Backend Packages

### 20. Google Gemini Integration

```bash
npm install @langchain/google-genai
```

Connects LangChain with Google's Gemini models.

Example:

```js
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
});
```

Used when building AI applications using Gemini instead of Mistral.

---

### 21. LangChain

```bash
npm install langchain
```

Core framework for building AI applications.

Provides:

* Agents
* Tools
* Messages
* Memory
* Chains
* AI Workflows

Think:

```text
LangChain = Express.js for AI Applications
```

---

### 22. Tavily

```bash
npm i @tavily/core
```

Search engine designed specifically for AI Agents.

Used when AI needs:

* Real-time information
* Internet access
* Web search capabilities

Example:

```text
User: What happened in AI today?

Agent
 ↓
Tavily Search
 ↓
Latest Results
 ↓
Final Response
```

Think:

```text
Tavily = Google Search for AI Agents
```

---

### 23. Zod

```bash
npm i zod
```

Schema validation library.

Used for:

* Tool validation
* API validation
* Type-safe inputs

Example:

```js
z.object({
    email: z.string(),
});
```

---

### 24. Morgan

```bash
npm i morgan
```

HTTP request logger middleware.

Shows:

* Which API was called
* Request method
* Status code
* Response time

Example Output:

```text
GET /api/users 200 15ms
POST /api/login 201 42ms
```

Usage:

```js
app.use(morgan('dev'));
```

Think:

```text
Morgan = CCTV Camera for APIs
```

---

### 25. Socket.IO

```bash
npm i socket.io
```

Used to enable real-time communication between server and client.

Examples:

* Chat Applications
* Notifications
* Live Updates
* Multiplayer Games

Flow:

```text
Client ↔ Server
```

without refreshing the page.

---

# Frontend Packages

### 26. Redux Toolkit

```bash
npm i @reduxjs/toolkit react-redux
```

Used for global state management.

Stores data that multiple components need.

Examples:

* User Information
* Authentication State
* Chat History
* Theme Settings

Think:

```text
Redux Store = Global Memory of the App
```

---

### 27. React Redux

```bash
npm install react-redux
```

Connects React components with the Redux Store.

Common Hooks:

```js
useSelector()
useDispatch()
```

Example:

```js
const user = useSelector(
    state => state.auth.user
);
```

---

### 28. Socket.IO Client

```bash
npm install socket.io-client
```

Frontend package used to connect React applications with a Socket.IO server.

Example:

```js
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");
```

Think:

```text
socket.io        = Backend
socket.io-client = Frontend
```

---

### 29. React Markdown

```bash
npm i react-markdown
```

Converts Markdown into React components.

Useful because AI responses are often returned in Markdown format.

Example:

```js
<ReactMarkdown>
    {message}
</ReactMarkdown>
```

Converts:

```md
# Hello

- Item 1
- Item 2
```

into properly rendered HTML.

---

### 30. Remark GFM

```bash
npm i remark-gfm
```

Adds GitHub Flavored Markdown support.

Enables:

* Tables
* Task Lists
* Strikethrough
* Extended Markdown Features

Example:

```md
| Name | Age |
|------|-----|
| Ashish | 25 |
```

Without `remark-gfm`, some advanced Markdown syntax won't render properly.

Usage:

```js
import remarkGfm from "remark-gfm";

<ReactMarkdown remarkPlugins={[remarkGfm]}>
    {message}
</ReactMarkdown>
```

---

# AI Chat App Architecture

```text
User
 ↓
React Frontend
 ↓
Socket.IO Client
 ↓
Socket.IO Server
 ↓
Agent
 ↓
LLM (Gemini / Mistral)
 ↓
Tools (Email, Search, DB, etc.)
 ↓
Response
 ↓
Markdown Rendering
 ↓
React UI
```

---

# Quick Revision

```text
LangChain           → AI Framework
Gemini              → LLM
Mistral             → LLM
Agent               → Decision Maker
Tool                → Function AI Can Use
Tavily              → Web Search for AI
Zod                 → Validation
Morgan              → API Logger
Socket.IO           → Real-time Communication
Redux Toolkit       → Global State Management
React Redux         → Connect Redux with React
Socket.IO Client    → Frontend Socket Connection
React Markdown      → Render AI Markdown
Remark GFM          → Advanced Markdown Support
```
