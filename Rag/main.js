import dotenv from 'dotenv';
dotenv.config();
import { PDFParse } from 'pdf-parse';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import fs from 'fs';
import { MistralAIEmbeddings } from '@langchain/mistralai';
import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pc.Index('rag-setup');

const embeddings = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: 'mistral-embed',
});

/* const dataBuffer = fs.readFileSync('./story.pdf');

const parser = new PDFParse({
    data: dataBuffer,
});
 */
/* const data = await parser.getText();

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
}); */

/* const chunks = await splitter.splitText(data.text); */

/* const docs = await Promise.all(
    chunks.map(async (chunk) => {
        const embedding = await embeddings.embedQuery(chunk);
        return {
            text: chunk,
            embedding,
        };
    })
); */

/* const result = await index.upsert({
    records: docs.map((doc, i) => ({
        id: `doc-${i}`,
        values: doc.embedding,
        metadata: {
            text: doc.text,
        },
    })),
});
 */
const queryEmbedding = await embeddings.embedQuery('how was the intership experience?');

const result = await index.query({
    vector : queryEmbedding,
    topK : 2,
    includeMetadata : true
})

console.log(JSON.stringify(result))