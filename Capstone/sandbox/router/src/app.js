import express from 'express';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
app.use(morgan('combined'));

app.get('/api/status/healthz', (req, res) => [
    res.status(200).json({
        status: 'ok',
    }),
]);

app.get('/api/status/readyz', (req, res) => {
    res.status(200).json({
        status: 'ready',
    });
});

// here we are creating caching middleware for the proxy requests

const proxies = {};

function getProxy(sandboxId) {
    if (!proxies[sandboxId]) {
        const target = `http://sandbox-service-${sandboxId}`; // construct target url based on sandboxId
        proxies[sandboxId] = createProxyMiddleware({
            target,
            changeOrigin: true,
            ws: true,
        });
    }
    return proxies[sandboxId];
}

app.use((req, res, next) => {
     console.log('SANDBOX SERVICE HOST:', req.headers.host);

    const host = req.headers.host;

    if (!host) {
        return res.status(400).json({
            error: 'Host header missing'
        });
    }

    const sandboxId = host.split('.')[0]; // extract sandboxId from subdomain

    const proxy = getProxy(sandboxId);
    return proxy(req, res, next);
});

export default app;
