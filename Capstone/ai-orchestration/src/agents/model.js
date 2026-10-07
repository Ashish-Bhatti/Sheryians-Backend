import { ChatOllama } from "@langchain/ollama";

const model = new ChatOllama({
  model: "qwen2.5-coder:7b",
  temperature: 0,
  baseUrl: "http://127.0.0.1:11434",
});

const response = await model.invoke(
  "Explain what a Kubernetes pod is in one sentence."
);

console.log(response.content);