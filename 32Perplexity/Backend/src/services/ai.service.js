import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatMistralAI } from '@langchain/mistralai';
import searchInternet from './internet.sevices.js';
import * as z from 'zod';
import { createAgent, tool } from 'langchain';

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
    model : mistralModel,
    tools : [searchInternet]
})