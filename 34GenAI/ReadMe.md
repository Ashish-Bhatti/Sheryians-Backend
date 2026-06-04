# AI Email Agent with LangChain + Mistral

A simple AI Agent built using LangChain and Mistral AI that can chat with users and send emails using custom tools.

---

# Installation

```bash
npm i langchain
npm i @langchain/mistralai
npm i zod
npm i nodemailer
npm i readline-sync
```

---

# Packages Used

### langchain

Main framework for building AI applications.

Provides:

- Agents
- Tools
- Message handling
- Memory
- Chains

---

### @langchain/mistralai

Connects LangChain with Mistral AI models.

Example:

```js
const model = new ChatMistralAI({
  model: "mistral-small-latest",
});
```

---

### zod

Used for schema validation.

Helps define what arguments a tool expects.

Example:

```js
z.object({
  email: z.string(),
  subject: z.string(),
});
```

---

### nodemailer

Used to send emails from Node.js applications.

Example:

```js
await transporter.sendMail({...});
```

---

### readline / readline-sync

Used to take user input from the terminal.

Example:

```js
const input = await rl.question("You: ");
```

---

# Important Concepts

## What is an LLM?

LLM (Large Language Model) is the AI model that generates responses.

Examples:

- GPT
- Claude
- Gemini
- Mistral

In our project:

```js
const model = new ChatMistralAI(...)
```

Mistral is the LLM.

---

## What is an Agent?

An Agent is a wrapper around an LLM that can:

- Think
- Decide
- Use tools
- Take actions

Without an Agent:

```text
User -> LLM -> Response
```

With an Agent:

```text
User
  ↓
Agent
  ↓
LLM
  ↓
Tool (if needed)
  ↓
Final Response
```

Example:

User:

```text
Send an email to John
```

The Agent decides:

```text
I need the email tool.
```

Then calls:

```js
sendEmail(...)
```

and returns the result.

---

## What are Tools?

Tools are normal backend functions that the AI can use.

Normally:

```js
sendEmail(...)
```

can only be called by developers.

When converted into a LangChain Tool:

```js
const emailTool = tool(sendEmail, {...});
```

the AI can call it whenever needed.

Think of tools as:

```text
AI Superpowers
```

Examples:

- Send Email
- Create User
- Fetch Weather
- Search Database
- Generate PDF
- Book Appointment

---

## What is a Tool Schema?

A schema tells the AI:

```text
What arguments are required?
```

Example:

```js
z.object({
  to: z.string(),
  subject: z.string(),
  html: z.string(),
});
```

This tells the AI:

```text
Before using the email tool,
provide:
- to
- subject
- html
```

---

## What are Messages?

Messages are conversation history.

Example:

```js
messages = [
  HumanMessage("Hello"),
  AIMessage("Hi"),
  HumanMessage("How are you?")
];
```

The Agent uses the entire history to understand context.

---

## Why Store Messages?

Without history:

```text
User: My name is Ashish
AI: Nice to meet you

User: What's my name?
AI: I don't know
```

With history:

```text
User: My name is Ashish
AI: Nice to meet you

User: What's my name?
AI: Your name is Ashish
```

---

# Common LangChain Mistakes

### Wrong Property Name

❌

```js
agent.invoke({
  message,
});
```

✅

```js
agent.invoke({
  messages,
});
```

---

### Wrong Data Type

❌

```js
messages: "Hello"
```

✅

```js
messages: [
  new HumanMessage("Hello")
]
```

---

### Wrong Object Shape

❌

```js
{
  msg: messages
}
```

✅

```js
{
  messages
}
```

---

### Missing Required Fields

Tool schema:

```js
z.object({
  email: z.string(),
});
```

Wrong:

```js
{}
```

Correct:

```js
{
  email: "test@gmail.com"
}
```

---

# Conversation Flow

```text
User Input
    ↓
HumanMessage
    ↓
messages[]
    ↓
agent.invoke()
    ↓
LLM thinks
    ↓
Uses tool if required
    ↓
Returns AIMessage
    ↓
Store AIMessage in messages[]
    ↓
Display response
```

---

# Key Takeaways

- LLM = Brain
- Agent = Decision Maker
- Tool = Backend Function AI Can Use
- Schema = Rules For Tool Inputs
- Messages = Conversation History
- LangChain = Framework Connecting Everything Together
