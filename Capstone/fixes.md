# Fixes made

## Sandbox routing and connectivity

- Added the `app: sandbox` label to dynamically created sandbox pods so they match the sandbox Service selector and receive traffic.
- Added explicit WebSocket upgrade routing in the router, forwarding `*.agent.localhost` and `*.preview.localhost` connections to the correct sandbox proxy.
- The agent already had permissive CORS middleware; the reported CORS error was caused by traffic not reaching the agent through the Service.

## AI invoke and preview URL

- Updated the frontend AI chat request to use `/api/ai/agents/invoke`, matching the route mounted by the AI orchestration service.
- Changed the sandbox start response to return `previewUrl` (matching the frontend property) and use HTTP for the local preview ingress.

## Preview file watching

- Added Vite's `awaitWriteFinish` watcher setting to wait until mounted files stop changing before processing them, reducing HMR updates during partial writes.
- Clarified in the README that the 300 ms polling interval controls how often changes are checked; `awaitWriteFinish` is the settling delay.

## Sandbox startup readiness

- Added HTTP readiness probes for both the Vite preview container and the sandbox agent container.
- The sandbox start endpoint now waits for the pod to become Ready (up to three minutes) before returning the sandbox URLs. Failed or timed-out startup returns an error instead of exposing a not-yet-ready sandbox.
- Updated the frontend loading screen to explain that it is waiting for the preview and file services, and to show server-provided startup errors.

## Validation

- JavaScript syntax checks passed for the changed server files.
- Frontend and sandbox-template production builds passed.
- A focused ESLint check on the loading screen reports existing `Math.random()`-during-render errors in the splash-screen particle animation; these are unrelated to the startup change.