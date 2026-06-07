import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatMistralAI } from '@langchain/mistralai';
import searchInternet from './internet.service.js';
import * as z from 'zod';
import { AIMessage, createAgent, HumanMessage, SystemMessage, tool } from 'langchain';

const geminiModel = new ChatGoogleGenerativeAI({
    model: 'gemini-2.5-flash-lite',
    apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
    model: 'mistral-medium-latest',
    apiKey: process.env.MISTRAL_API_KEY,
});

const searchInternetTool = tool(searchInternet, {
    name: 'searchInternet',
    description: 'Use this tool to get the latest informatin from the internet',
    schema: z.object({
        query: z.string().describe('the search query to look up on the internet'),
    }),
});

const agent = createAgent({
    model: geminiModel,
    tools: [searchInternetTool],
});

export async function generateResponse(messages) {
    const response = await agent.invoke({

        messages: [
            new SystemMessage(`

                You have access to a tool called searchInternet.
                For:
                - current events
                - latest news
                - stock prices
                - weather
                - sports results
                - information after your training cutoff

                ALWAYS call searchInternet before answering.
                Do not guess.
            `),
            ...messages.map((msg) => {
                if (msg.role == 'user') {
                    return new HumanMessage(msg.content);
                } else if (msg.role == 'ai') {
                    return new AIMessage(msg.content);
                }
            }),
        ],
    });

    console.dir(response, { depth: null });

    const lastMessage = response.messages[response.messages.length - 1];

    // console.log(lastMessage);

    return lastMessage.content;
}

export async function generateChatTitle(message) {
    const response = await mistralModel.invoke([
        new SystemMessage(`
            You are a helpful assistant that generates concise and descriptive titles for chat conversations.

            User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging, giving users a quick understanding of the chat's topic.
        `),
        new HumanMessage(`
            Generate a title for a chat conversation based on the following first message:
            "${message}"
        `),
    ]);

    return response.text;
}
