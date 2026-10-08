import express from 'express';
import morgan from 'morgan';
import agentRouter from './routes/agent.routes.js';

const app = express();

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

app.get('/api/status/healthz', (req, res) => {
    res.status(200).json({
        message: 'Server is healthy',
        status: 'success',
    });
});


// Routes
app.use('/api/ai/agents', agentRouter);

export default app;
