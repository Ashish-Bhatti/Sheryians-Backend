to create deployment.yml file we use a shortcut "deployment_simple"

=> deployment.yml -------------> manage pods

=> steps

# create a separate folder for kubernetes files k8s

1.  create a cluster in kubernetes
2.  create and apply deployment.yml with terminal
    kubectl apply -f deployment.yml
3.  create service and apply with terminal
    kubectl apply -f service.yml
4.  install ingress controller - in PowerShell
    kubectl apply -f `
    https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.1/deploy/static/provider/cloud/deploy.yaml

        - in bash
        kubectl apply -f \

    https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.1/deploy/static/provider/cloud/deploy.yaml

5.  to verify the ingress controller installed
    kubectl get pods -n ingress-nginx
6.  apply ingress.yml
    kubectl apply -f ingress.yml
7.  Metric Server - it will help us to autoscale the pods. By default we don't get it with kubernetes - it monitor how much resources are pods consuming

after installing metric server run - to check how much resource are they consuming

kubectl top pods

# Install Metrics Server

## PowerShell (Windows)

```powershell
# Install the Metrics Server using the official manifest
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# Docker Desktop uses self-signed kubelet certificates.
# Patch the Metrics Server to skip TLS verification.
$patch = @'
[
  {
    "op": "add",
    "path": "/spec/template/spec/containers/0/args/-",
    "value": "--kubelet-insecure-tls"
  }
]
'@

kubectl patch deployment metrics-server `
  -n kube-system `
  --type=json `
  --patch $patch

# Wait until the Metrics Server Deployment is ready
kubectl rollout status deployment/metrics-server -n kube-system

# Verify installation
# You should now see CPU and Memory usage.
kubectl top nodes
kubectl top pods
```

---

## Bash (Linux / macOS / Git Bash)

```bash
# Install the Metrics Server using the official manifest
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# Docker Desktop uses self-signed kubelet certificates.
# Patch the Metrics Server to skip TLS verification.
kubectl patch deployment metrics-server -n kube-system \
  --type=json \
  -p='[{"op":"add","path":"/spec/template/spec/containers/0/args/-","value":"--kubelet-insecure-tls"}]'

# Wait until the Metrics Server Deployment is ready
kubectl rollout status deployment/metrics-server -n kube-system

# Verify installation
# You should now see CPU and Memory usage.
kubectl top nodes
kubectl top pods
```

8. to watch the logs during HEY sending traffic

## View Logs from a Deployment

Instead of finding a Pod name manually, you can view logs directly from a Deployment.

### Show the last 100 log lines and follow new logs

```powershell
kubectl logs deployment/express-deployment --tail=100 -f
```

### What this does

- `deployment/express-deployment` → Selects the Pods managed by the Deployment.
- `--tail=100` → Displays the last 100 log lines.
- `-f` (`--follow`) → Streams new logs in real time, similar to `tail -f`.

As your application receives requests, you'll see logs appear live in the terminal.

Example output:

```text
GET / 200 3.45 ms - 1250
GET /api/users 200 7.81 ms - 532
GET /health 200 1.12 ms - 2
```

> **Tip:** If you're using Morgan in your Express application, all HTTP request logs will appear here automatically because Kubernetes captures everything written to `stdout` and `stderr`.

- for single pod
kubectl logs -f <pod-name>

- for multiple pod use label selector
kubectl logs -l <label-selector>
kubectl logs -l app=express

- To see the labels:
kubectl get pods --show-labels

- to see logs of multiple pods
kubectl logs -f -l app=express

- Useful log commands
# Show logs
kubectl logs <pod-name>

# Stream logs
kubectl logs -f <pod-name>

# Last 20 lines
kubectl logs --tail=20 <pod-name>

# Last 10 minutes
kubectl logs --since=10m <pod-name>

# Previous container logs (after a crash/restart)
kubectl logs -p <pod-name>

9. watch cli similar setup without installing
run this command to check pods resources every 5 sec - it will automatic run this command and to stop it Ctrl + C

while ($true) {
    Clear-Host
    kubectl top pods
    Start-Sleep -Seconds 5
}

10. on first time setup install this - https://github.com/rakyll/hey
 to send heavy traffic on our kubernetes pods

 hey -z 2m -c 100 http://localhost

11. now to autoscale
kubectl autoscale deployment express-deployment `
    --min=2 `
    --max=10 `
    --cpu=50%

it means 3 is mininum pods and 10 is the max it can go and it can create pods once it reach 50%  usages of cpu

12. now we will create a new deployment-product.yml and service-product.yml and the new ingress rule go into existing file under rule -> https



# we need 3 basic file to setup the kubernetes

1. deployment.yml -> it is a managers of pods. it tells which image to run. It stores all the basic info like ram, cpu, replica's etc
2. service.yml -> pods are temporary they change there ip address when we stop and run again to service help us to create a stable endpoint to access pods that never changes. It find pods using label selectors and load balances the traffic acroos all matching pods. when a pod is added or remove it updated the list
3. ingress.yml -> It is like a rule book. It is a set of HTTP routing rule written in YML. It itself do nothing - it only works when an Ingress Controller is installed to read and act on those rule.

=> for basic understanding

1. pods -> server
2. deployment -> manage pods
3. service -> manage and forward the traffic to pods
4. ingress controller(nginx) -> it get request from user and forward to servie
5. ingress -> it is a set of rule which ingress controller use to decide to send traffic on which service(we can have multiple service)

=> command

# to remove deployment

kubectl delete deployment express-deployment

# to delete pod

kubectl delete pod -l app=express
