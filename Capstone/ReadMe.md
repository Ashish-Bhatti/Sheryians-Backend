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

- import fs from 'fs'; is a JavaScript statement used to import Node.js's built-in File System (fs) module. This module provides a set of functions for interacting with the file system, such as reading, writing, and deleting files.


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

=> day 3
- we will create 2 container inside a pod and both will have access to /workspace directory
- 1st container/template/vite-dev-server is only for preview url
- 2nd container/agent/express server will give us api - read/list/update/create file so we can can change /workspace folder content
- Once this pod is closed everything will be deleted for now
- we will add a volume inside /sandbox/server/kubernetes/pods.js as /workspace_volume so both of those container can access it and we can sync them and there will /workspace folder in both agent and vite-dev-server container
- after doing step 5 our router server now handle both type of api
  pod1.preview.localhost
  pod1/agent/localhost
- Create an initContainer to copy /workspace/. from the template image to /seed/ (the shared volume).
1. InitContainers run before the main containers and automatically stop after completing their task.
2. We use this because mounting the empty workspace-volume at /workspace would hide the Vite setup from the template image and make /workspace empty.
3. The initContainer fills the shared volume with the Vite project first.

- Add a volumeMount for workspace-volume in both the Vite and Agent containers so they share and sync the same /workspace files.



setps :-
1. create a express server in agent folder inside sandox
2. change /sandbox/server/kubernetes/pods.js to add new image agent so we can run 2 container inside a pod
3. creating a volume inside /sandbox/server/kubernetes/pods.js as /workspace so both of those container can access it and we can sync them and there will /workspace folder in both agent and vite-dev-server container
4. creating volumeMount in both images to sync them with workspace_volume
5. change ./k8s/ingress.yml to add  - host: '*.agent.localhost'



# Install nginx ingress controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.1/deploy/static/provider/cloud/deploy.yaml


# kubectl rollout command from the k8s folder
 kubectl rollout restart deployment router-deployment

maintaining readme file 