import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';

const model = new ChatOpenAI({
  apiKey: process.env.INCEPTION_API_KEY,
  model: "mercury-2.5",
  temperature: 0,
  maxTokens: 512,
  configuration: {
    baseURL: "https://api.inceptionlabs.ai/v1",
  },
});

const response = await model.invoke(
  "Reply with exactly: Mercury is connected."
);

console.log(response.content);
