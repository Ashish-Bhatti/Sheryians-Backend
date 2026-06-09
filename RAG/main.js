import { PDFParse } from 'pdf-parse';
import fs from 'fs';

const dataBuffer = fs.readFileSync('./story.pdf');

const parser = new PDFParse({
    data: dataBuffer,
});

console.log(parser)
