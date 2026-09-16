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

npm i http-proxy-middleware
- for reverse proxy
- http-proxy-middleware is a popular Node.js library used to proxy requests in frameworks like Express, Connect, and Next.js. It is commonly used in development to bypass CORS restrictions or to create an API gateway that routes client requests to different microservices


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
- rbac.yml :- by default kubernetes don't allow any pods to create pods so we need to create a role and role binding to allow pods to create pods and to give that permission we just rbac.yaml file
    we are creating a service account with rbac.yml file like CTO of a company and gave some permissions to that service account and we will give this role to sandbox pods so that they can create there on pods for preview
- router
to bypass the cors error and to send traffic from router to pods 



# Install nginx ingress controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.1/deploy/static/provider/cloud/deploy.yaml