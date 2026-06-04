/* import { tavily } from '@tavily/core';

const tvly = tavily({ apiKey: process.env.TVLY_API_KEY });
const response = await tvly.search("Who is Leo Messi?");

console.log(response); */

import { tavily } from '@tavily/core';

const tvly = tavily({
    apiKey: process.env.TVLY_API_KEY,
});

let query = 'who is narender modi';
const results = await tvly.search(query, {
    maxResults: 5,
});

console.log(results);
