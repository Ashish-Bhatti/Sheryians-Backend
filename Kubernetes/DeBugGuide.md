# Debugging Kubernetes Applications

When working with Kubernetes, **don't guess the problem**. Kubernetes provides commands that tell you exactly what's wrong.

---

# 1. Check if your resources were created

```bash
kubectl get deployments
kubectl get pods
kubectl get services
```

Example:

```text
NAME                 READY   UP-TO-DATE   AVAILABLE
express-deployment   2/2     2            2
```

If the Deployment exists but Pods aren't running, continue debugging.

---

# 2. Check Pod Status

```bash
kubectl get pods
```

Common Pod states:

| Status | Meaning |
|---------|----------|
| Running | Everything is working |
| Pending | Pod hasn't started yet |
| ContainerCreating | Kubernetes is creating the container |
| ImagePullBackOff | Cannot pull Docker image |
| ErrImagePull | Failed to download image |
| CrashLoopBackOff | Application keeps crashing |
| Completed | Job finished successfully |

---

# 3. Describe the Pod (Most Important Command)

```bash
kubectl describe pod <pod-name>
```

This command tells you:

- Scheduling issues
- Image pull failures
- Resource issues
- Container events
- Exact error messages

Always scroll to the bottom and check the **Events** section.

Example:

```text
Failed to pull image
ImagePullBackOff
ErrImageNeverPull
Insufficient memory
```

Most Kubernetes debugging starts here.

---

# 4. Check Application Logs

If the Pod starts but your application crashes:

```bash
kubectl logs <pod-name>
```

If the Pod has multiple containers:

```bash
kubectl logs <pod-name> -c <container-name>
```

---

# 5. Describe Deployment

```bash
kubectl describe deployment express-deployment
```

Useful for checking:

- Replica count
- Image name
- ImagePullPolicy
- Events

---

# 6. Verify the Deployment YAML

```bash
kubectl get deployment express-deployment -o yaml
```

Useful to verify Kubernetes is actually using:

- correct image
- correct imagePullPolicy
- correct ports
- correct replicas

Sometimes we edit a YAML file but forget to apply it.

---

# 7. Check Cluster Nodes

```bash
kubectl get nodes
```

Example:

```text
NAME                    STATUS
desktop-control-plane   Ready
```

If the node is **NotReady**, Pods cannot start.

---

# 8. Verify Current Kubernetes Context

```bash
kubectl config current-context
```

Example:

```text
docker-desktop
```

Sometimes you're deploying to the wrong Kubernetes cluster.

---

# 9. Check Docker Image

Make sure the image actually exists.

```bash
docker images
```

or

```bash
docker image inspect <image-name>:<tag>
```

If Docker cannot find the image, Kubernetes cannot run it.

---

# 10. Restart Deployment

```bash
kubectl rollout restart deployment express-deployment
```

or simply delete Pods:

```bash
kubectl delete pod -l app=express
```

The Deployment automatically creates new Pods.

---

# 11. Delete and Recreate Deployment

Sometimes recreating the Deployment is easier.

```bash
kubectl delete deployment express-deployment

kubectl apply -f deployment.yml
```

---

# Common Errors

## Pending

Usually caused by:

- insufficient CPU
- insufficient RAM
- node not ready
- scheduling issues

Debug using:

```bash
kubectl describe pod <pod-name>
```

---

## ImagePullBackOff

Kubernetes cannot download the Docker image.

Possible reasons:

- wrong image name
- image doesn't exist
- private registry
- authentication problem
- wrong imagePullPolicy

---

## ErrImageNeverPull

Occurs when:

```yaml
imagePullPolicy: Never
```

but the image does **not exist locally**.

---

## CrashLoopBackOff

Container starts and immediately crashes.

Debug:

```bash
kubectl logs <pod-name>
```

---

## ContainerCreating

Usually temporary.

If it takes too long:

```bash
kubectl describe pod <pod-name>
```

---

# Real Debugging Example (What We Encountered)

## Problem

Pods were not starting.

```text
ImagePullBackOff
```

Changing:

```yaml
imagePullPolicy: Always
```

to

```yaml
imagePullPolicy: Never
```

changed the error to:

```text
ErrImageNeverPull
```

This told us Kubernetes was **not trying to download the image anymore**, but also **couldn't find it locally**.

---

## Investigation

We checked:

```bash
docker images
```

Output looked like:

```text
cohort_2_express:lastest
```

Notice the typo:

```text
lastest ❌
latest  ✅
```

Our Deployment was using:

```yaml
image: cohort_2_express:latest
```

while Docker contained:

```text
cohort_2_express:lastest
```

So Kubernetes searched for:

```text
cohort_2_express:latest
```

which didn't exist.

---

## Solution

Either rebuild:

```bash
docker build -t cohort_2_express:latest .
```

or retag:

```bash
docker tag cohort_2_express:lastest cohort_2_express:latest
```

Then restart the Deployment:

```bash
kubectl rollout restart deployment express-deployment
```

---

# Kubernetes Debugging Checklist

Whenever something doesn't work:

1. Check resources

```bash
kubectl get all
```

2. Check Pod status

```bash
kubectl get pods
```

3. Describe the Pod

```bash
kubectl describe pod <pod-name>
```

4. Read application logs

```bash
kubectl logs <pod-name>
```

5. Verify Docker image

```bash
docker images
docker image inspect <image>:<tag>
```

6. Verify Deployment

```bash
kubectl describe deployment
kubectl get deployment -o yaml
```

7. Restart if needed

```bash
kubectl rollout restart deployment <deployment-name>
```

---

# Golden Rule

> **Don't guess. Let Kubernetes tell you the problem.**

In most cases, these three commands are enough to identify the issue:

```bash
kubectl get pods

kubectl describe pod <pod-name>

kubectl logs <pod-name>
```

Read the error message carefully before making changes. Kubernetes is usually very specific about why a Pod failed to start.