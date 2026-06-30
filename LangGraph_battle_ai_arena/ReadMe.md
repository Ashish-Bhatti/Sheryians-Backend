// basic setup packages
- npm i -D typescript tsx - to use typescript in devlopment mode
- npx tsc --init
- npm i express
- npm i -D @types/express

// AI packages
- npm install @langchain/google @langchain/core
- npm install @langchain/mistralai @langchain/core
- npm i @langchain/cohere
- npm install @langchain/langgraph @langchain/core
- npm i zod

// Mental Model

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

-------------------------------

Graph = Workflow

State = Shared memory

Node = Function that:
       1. Reads state
       2. Does work
       3. Returns updates

Edge = Decides which node runs next

If you already know Express, a rough comparison is:

Express Middleware Chain

req -> middleware1 -> middleware2 -> response

LangGraph

state -> node1 -> node2 -> END

---------------------------------

1. Graph = Entire Workflow

The graph is the overall process.

START
  |
Generate Solution
  |
Judge Solution
  |
END

It knows:

What nodes exist
How nodes are connected
Where execution starts and ends

2. State = Shared Memory

The state is the data that travels through the graph.
{
  problem: "How to learn Node.js?",
  solution_1: "",
  solution_2: "",
  judge: {}
}
As nodes run, this state gets updated.

3. Node = A Step in the Workflow

A node is usually just an async function.
async (state) => {
  // do work

  return {
    solution_1: "..."
  }
}
A node:

Reads the current state
Performs some work (LLM call, database query, tool call, API call, etc.)
Returns updates to the state

4. Edge = Execution Path

An edge tells LangGraph:
After node A,
run node B

Example:
.addEdge("solution", "judge")

means:
solution
    |
    v
judge

// for the code in this project
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