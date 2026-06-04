import { tavily } from '@tavily/core';

const tvly = tavily({
    apiKey: process.env.TVLY_API_KEY,
});

async function searchInternet(query) {
    const results = await tvly.search(query, {
        maxResults: 5,
    });

    console.log(JSON.stringify(results));

    return JSON.stringify(results);
}

export default searchInternet;
