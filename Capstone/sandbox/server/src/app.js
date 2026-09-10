import express from 'express';
import morgan from 'morgan';
import { createPod } from './kubernetes/pod.js';
import { createService } from './kubernetes/service.js';
import { v7 as uuid } from 'uuid';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

/*
express.urlencoded() → Reads HTML form request bodies.
extended: true → Can parse complex/nested form data.
 */
app.use(express.urlencoded({ extended: true })); // it is middleware just like json - it help us to read form data from html file and extended means it can read complex data like nested

app.get('/api/sandbox/health', (req, res) => {
    res.status(200).json({
        message: 'Sandbox API is healthy',
        status: 'ok',
    });
});

app.get('/api/sandbox/check', (req, res) => {
    res.status(200).json({
        message: 'Sandbox API is healthy',
        status: 'ok',
    });
});

app.post('/api/sandbox/start', async (req, res) => {
    const sandboxId = uuid();

    await Promise.all([createPod(sandboxId), createService(sandboxId)]);

    return res.status(201).json({
        message: 'Sandbox enviroment created successfully',
        sandboxId,
        previewURL: `https://${sandboxId}.preview.localhost`,
    });
});

export default app;
