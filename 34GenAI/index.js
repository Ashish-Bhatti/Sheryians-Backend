import 'dotenv/config'; // Load environment variables from .env file

import readline from 'readline/promises';
import { ChatMistralAI } from '@langchain/mistralai';
import { HumanMessage, tool, createAgent } from 'langchain';
import { sendEmail } from './mail.service.js';
import * as z from 'zod';

// Create a tool that the AI can use
// When the AI decides to send an email, it will call sendEmail()
const emailTool = tool(
    sendEmail,
    {
        name: 'emailTool',
        description: 'Use this tool to send an email',

        // Define what data the AI must provide
        schema: z.object({
            to: z.string().describe("The recipient's email address"),
            html: z.string().describe('The HTML content of the email'),
            subject: z.string().describe('The subject of the email'),
        }),
    }
);

// Create a command line chat interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Create the Mistral model
const model = new ChatMistralAI({
    model: 'mistral-small-latest',
});

// Create an AI agent
// Agent = Model + Tools
const agent = createAgent({
    model,
    tools: [emailTool],
});

// Store the entire conversation history
// Both user and AI messages are saved here
const messages = [];

let state = true;

while (state) {

    // Wait for user input from terminal
    const userInput = await rl.question('\x1b[32mYou:\x1b[0m ');

    // Convert user text into a HumanMessage
    // and add it to conversation history
    messages.push(new HumanMessage(userInput));

    // Stop the chat if user types "stop"
    if (userInput == 'stop') {
        state = false;
        break;
    }

    // Send the entire conversation history to the agent
    const response = await agent.invoke({
        messages,
    });

    // response.messages contains all messages
    // The last message is usually the latest AI response
    const aiMessage =
        response.messages[response.messages.length - 1];

    // Save AI response in chat history
    // This allows the AI to remember previous replies
    messages.push(aiMessage);

    // Print only the AI's text content
    console.log(aiMessage.content);
}

// Close the readline interface when chat ends
rl.close();