# 4 Services in this project




1. Auth
2. Notification
3. Ai Orchestration
4. Sandbox
    - roles
        - create containers for vite dev server
        - provide terminal access
        - provide Preview URL
        - provide the APIs for file updates
        - delete containers


// package
npm i -D nodemon
- The -D (or --save-dev) flag installs nodemon as a development dependency, since it's only needed during development.







// explanation
"dev": "nodemon -L server.js",
- -L for legacy or (commonly in Docker, WSL, or network-mounted filesystems)

| Probe              | Purpose                                                            | What happens if it fails?                                                               |
| ------------------ | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| **livenessProbe**  | Checks if the application is still alive (not hung or deadlocked). | Kubernetes **restarts** the container.                                                  |
| **readinessProbe** | Checks if the application is ready to receive traffic.             | Kubernetes **removes the pod from the Service endpoints**, but does **not restart** it. |
