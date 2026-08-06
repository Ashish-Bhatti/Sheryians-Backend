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

npm i @kubernetes/client-node

npm i uuid
- it will generate unique id - Written out, it looks like a string of random letters, numbers, and hyphens




// explanation
"dev": "nodemon -L server.js",
- -L for legacy or (commonly in Docker, WSL, or network-mounted filesystems)

| Probe              | Purpose                                                            | What happens if it fails?                                                               |
| ------------------ | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| **livenessProbe**  | Checks if the application is still alive (not hung or deadlocked). | Kubernetes **restarts** the container.                                                  |
| **readinessProbe** | Checks if the application is ready to receive traffic.             | Kubernetes **removes the pod from the Service endpoints**, but does **not restart** it. |


// commands
- it will apply all the file inside k8s folder
kubectl apply -f ./k8s


=> day 1
- we setup sandbox microservice in kubernetes with basic express server and yml files

=> day 2
- sandbox pods :- we give sandbox microservice access to create user pods with creating there service
- Router server :- it sends traffic to pods services
estions