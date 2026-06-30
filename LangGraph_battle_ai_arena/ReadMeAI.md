# LangGraph + TypeScript Setup

## 📦 Basic Setup

### Install TypeScript (Development)

```bash
npm i -D typescript tsx
```

- `typescript` → Adds TypeScript support.
- `tsx` → Runs TypeScript files directly without compiling manually.

---

### Initialize TypeScript

```bash
npx tsc --init
```

Creates a `tsconfig.json` file.

---

### Install Express

```bash
npm i express
```

Express is used to create APIs and web servers.

---

### Install Express Type Definitions

```bash
npm i -D @types/express
```

Provides TypeScript types for Express.

Without it, TypeScript won't understand objects like:

- `Request`
- `Response`
- `NextFunction`

---

# 🤖 AI Packages

## Google Gemini

```bash
npm install @langchain/google-genai @langchain/core
```

Connects LangChain with Google's Gemini models.

---

## Mistral AI

```bash
npm install @langchain/mistralai @langchain/core
```

Connects LangChain with Mistral models.

---

## Cohere

```bash
npm i @langchain/cohere
```

Connects LangChain with Cohere models.

---

## LangGraph

```bash
npm install @langchain/langgraph @langchain/core
```

Used to build AI workflows using graphs.

Provides:

- Graphs
- State
- Nodes
- Edges

---

## Zod

```bash
npm i zod
```

Schema validation library.

Used for:

- Validating tool inputs
- Validating API data
- Type-safe objects

---

# 🧠 LangGraph Mental Model
```
Graph
 |
 |---- State (shared memory)
 |
 |---- Node A
 |        |
 |        | updates state
 |        v
 |
 |---- Edge
 |        |
 |        v
 |
 |---- Node B
 |        |
 |        | updates state
 |        v
 |
END
```

or

```
                Graph (Workflow)
                     │
      ┌──────────────┼──────────────┐
      │                              │
 Shared State                    Execution Flow
      │                              │
      ▼                              ▼
   Node A  ──────►  Node B  ──────►  END
```

---

## 1. Graph = Workflow

The graph represents the complete workflow.

Example:

```
START
   │
Generate Solution
   │
Judge Solution
   │
END
```

The graph knows:

- Which nodes exist
- How nodes are connected
- Where execution starts
- Where execution ends

Think of it as the **manager** of your application.

---

## 2. State = Shared Memory

State is the data shared between all nodes.

Example:

```ts
{
  problem: "How to learn Node.js?",
  solution_1: "",
  solution_2: "",
  judge: {}
}
```

Every node can:

- Read the state
- Add new values
- Update existing values

Think:

```
State = Shared Memory
```

---

## 3. Node = One Step in the Workflow

A node is usually just an async function.

```ts
async (state) => {

    // Do some work

    return {
        solution_1: "..."
    };
}
```

A node can:

- Read the current state
- Call an LLM
- Query a database
- Use tools
- Call APIs
- Return updates

Think:

```
Node = Function
```

Every node follows this pattern:

```
Read State
     │
Do Work
     │
Return Updates
```

---

## 4. Edge = Connection Between Nodes

An edge decides which node runs next.

Example:

```ts
.addEdge("solution", "judge")
```

means:

```
solution
    │
    ▼
judge
```

Think:

```
Edge = Road between Nodes
```

---

# Express vs LangGraph

If you already know Express, LangGraph becomes much easier.

### Express

```
Request
   │
   ▼
Middleware 1
   │
   ▼
Middleware 2
   │
   ▼
Response
```

---

### LangGraph

```
State
   │
   ▼
Node 1
   │
   ▼
Node 2
   │
   ▼
END
```

Comparison:

| Express | LangGraph |
|---------|-----------|
| req | state |
| middleware | node |
| next() | edge |
| response | final state |

---

# Complete Flow

```
START
   │
   ▼
State Created
   │
   ▼
Node 1
   │
Updates State
   ▼
Node 2
   │
Updates State
   ▼
Node 3
   │
Updates State
   ▼
END
```

---

# Flow of This Project
```

User Problem
      |
      v
Shared State
      |
      v
solutionNode
      |
      | adds:
      | solution_1
      | solution_2
      v
Updated State
      |
      v
judgeNode
      |
      | adds:
      | judge scores
      | judge reasoning
      v
Final State
      |
      v
Return Result
```

or

```
                 User Problem
                      │
                      ▼
              Initial Shared State
                      │
                      ▼
               solutionNode
                      │
      ┌───────────────┴───────────────┐
      │                               │
Adds solution_1                 Adds solution_2
      │                               │
      └───────────────┬───────────────┘
                      ▼
                Updated State
                      │
                      ▼
                 judgeNode
                      │
      ┌───────────────┴───────────────┐
      │                               │
   Adds Scores                Adds Reasoning
      │                               │
      └───────────────┬───────────────┘
                      ▼
                 Final State
                      │
                      ▼
                 Return Result
```

---

# Quick Revision

| Concept | Think of it as |
|----------|----------------|
| **Graph** | Entire Workflow |
| **State** | Shared Memory |
| **Node** | Function / Step |
| **Edge** | Connection / Road |
| **START** | Entry Point |
| **END** | Exit Point |

---

# One-Line Definitions

### Graph

The complete workflow that controls how execution moves through different nodes.

---

### State

A shared object that carries data throughout the workflow.

---

### Node

A function that reads the current state, performs work, and returns updates.

---

### Edge

A connection that tells LangGraph which node should execute next.

---

# Mental Shortcut

```
Graph
   │
Workflow
   │
State travels through
   │
Nodes
   │
Connected by
   │
Edges
   │
Until END
```