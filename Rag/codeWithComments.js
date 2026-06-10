// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Used to extract text from PDF files
import { PDFParse } from 'pdf-parse';

// Used to break large text into smaller chunks
// because embeddings models have token limits
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

// Used to read files from local storage
import fs from 'fs';

// Mistral embedding model
// Converts text into vectors (arrays of numbers)
import { MistralAIEmbeddings } from '@langchain/mistralai';

// Pinecone vector database
// Stores embeddings and performs similarity search
import { Pinecone } from '@pinecone-database/pinecone';


// ======================================
// STEP 1: CONNECT TO PINECONE
// ======================================

// Create Pinecone client
const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

// Connect to an existing Pinecone index
const index = pc.Index('rag-setup');


// ======================================
// STEP 2: CREATE EMBEDDING MODEL
// ======================================

// Embedding model converts text into vectors
// Example:
//
// "I love cricket"
// ↓
// [0.12, 0.44, 0.91, ...]
//
// Similar meaning text will have similar vectors.
const embeddings = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: 'mistral-embed',
});


// ======================================
// STEP 3: READ PDF FILE
// ======================================

// Read PDF from local storage as a buffer
//
// story.pdf
// ↓
// Binary Data
//
/*
const dataBuffer = fs.readFileSync('./story.pdf');


// Create PDF parser
const parser = new PDFParse({
    data: dataBuffer,
});
*/


// ======================================
// STEP 4: EXTRACT TEXT FROM PDF
// ======================================

// Convert PDF into plain text
//
// PDF
// ↓
// "Once upon a time...."
//
/*
const data = await parser.getText();
*/


// ======================================
// STEP 5: SPLIT TEXT INTO CHUNKS
// ======================================

// Large documents are broken into smaller pieces.
//
// Why?
//
// Embedding models perform better on smaller chunks.
//
// Example:
//
// Original:
// ----------------------------------
// This is a very large document...
// ----------------------------------
//
// After splitting:
// ----------------------------------
// Chunk 1
// Chunk 2
// Chunk 3
// ----------------------------------
/*
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,      // max characters per chunk
    chunkOverlap: 0,     // overlap between chunks
});
*/


// ======================================
// STEP 6: CREATE CHUNKS
// ======================================

/*
const chunks = await splitter.splitText(data.text);
*/


// ======================================
// STEP 7: GENERATE EMBEDDINGS
// ======================================

// Convert every chunk into a vector.
//
// Example:
//
// "I love cricket"
// ↓
// [0.12, 0.88, 0.41...]
//
// This is what allows semantic search.
/*
const docs = await Promise.all(
    chunks.map(async (chunk) => {

        const embedding =
            await embeddings.embedQuery(chunk);

        return {
            text: chunk,
            embedding,
        };
    })
);
*/


// ======================================
// STEP 8: STORE EMBEDDINGS IN PINECONE
// ======================================

// Save vectors in Pinecone.
//
// Each record contains:
//
// id
// vector
// original text
//
// Example:
//
// {
//   id: "doc-1",
//   values: [...],
//   metadata: {
//      text: "..."
//   }
// }
/*
const result = await index.upsert({
    records: docs.map((doc, i) => ({
        id: `doc-${i}`,

        // vector embedding
        values: doc.embedding,

        // original text
        metadata: {
            text: doc.text,
        },
    })),
});
*/


// =====================================================
// EVERYTHING ABOVE IS INGESTION PHASE
// (Upload PDF → Create Chunks → Create Embeddings → Store)
// =====================================================



// =====================================================
// NOW START RETRIEVAL PHASE
// =====================================================


// ======================================
// STEP 9: USER ASKS A QUESTION
// ======================================

// User query:
//
// "how was the internship experience?"
//
// Convert query into embedding.
//
// Query
// ↓
// Vector
const queryEmbedding =
    await embeddings.embedQuery(
        'how was the intership experience?'
    );


// ======================================
// STEP 10: SEARCH SIMILAR VECTORS
// ======================================

// Pinecone compares:
//
// Query Vector
// VS
// Stored Vectors
//
// and returns the most similar chunks.
//
// topK: 2
// means return the 2 closest matches.
const result = await index.query({
    vector: queryEmbedding,

    topK: 2,

    // Return original text too
    includeMetadata: true,
});


// ======================================
// STEP 11: VIEW RESULTS
// ======================================

// Returns something like:
//
// {
//   matches: [
//      {
//        score: 0.95,
//        metadata: {
//           text: "..."
//        }
//      }
//   ]
// }
console.log(JSON.stringify(result));



/*
=========================================
RAG FLOW (BIG PICTURE)
=========================================

PDF
 ↓
Extract Text
 ↓
Split into Chunks
 ↓
Create Embeddings
 ↓
Store in Pinecone
 ---------------------------------
 User asks question
 ---------------------------------
 ↓
Convert Question to Embedding
 ↓
Search Similar Vectors
 ↓
Retrieve Relevant Chunks
 ↓
Send Chunks + Question to LLM
 ↓
Final Answer


This is the basic Retrieval Augmented Generation (RAG) pipeline.
*/