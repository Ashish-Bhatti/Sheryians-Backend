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
const agentProxies = {};

function getProxy(sandboxId) {
    const target = `http://sandbox-service-${sandboxId}`; // construct target url based on sandboxId

    if (!proxies[sandboxId]) {
        proxies[sandboxId] = createProxyMiddleware({
            target,
            changeOrigin: true,
            ws: true,
        });
    }
    return proxies[sandboxId];
}

function getAgentProxy(sandboxId) {
    // we added 3000 because this time we added custom port by default http sent to port no 80 which we use in getProxy
    const target = `http://sandbox-service-${sandboxId}:3000`; // construct target url based on sandboxId

    if (!agentProxies[sandboxId]) {
        agentProxies[sandboxId] = createProxyMiddleware({
            target,
            changeOrigin: true,
            ws: true,
        });
    }
    return agentProxies[sandboxId];
}

app.use((req, res, next) => {
    console.log('SANDBOX SERVICE HOST:', req.headers.host);

    const host = req.headers.host;

    if (!host) {
        return res.status(400).json({
            error: 'Host header missing',
        });
    }

    const sandboxId = host.split('.')[0]; // extract sandboxId from subdomain

    /**
     * pod1.preview.localhost
     * pod1.agent.localhost
     */

    if (host.split('.')[1] === 'agent') {

        const proxy = getAgentProxy(sandboxId);
        return proxy(req, res, next);

    } else if (host.split('.')[1] === 'preview') {

        const proxy = getProxy(sandboxId);
        return proxy(req, res, next);
    }
});

export default app;
