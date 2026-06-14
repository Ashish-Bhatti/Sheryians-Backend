import { ChatGoogle } from "@langchain/google";
import { MistralAI } from "@langchain/mistralai"
import { ChatCohere } from "@langchain/cohere";
import config from '../config/congif.js'

export const modelGoogle = new ChatGoogle({
    model : "gemini-2.5-flash",
    apiKey : config.GOOGLE_API_KEY
});

export const modelMistral = new MistralAI({
    model : "mistral-medium-latest" ,
    apiKey : config.MISTRAL_API_KEY
})

export const cohereModel = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: config.COHERE_API_KEY,
})