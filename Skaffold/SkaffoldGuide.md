## 🧹 Cleaning Up Skaffold & Kubernetes Resources

During development, you may want to remove everything that Skaffold deployed and start with a clean cluster.

### Option 1: Remove Everything Created by Skaffold (Recommended)

If `skaffold dev` is running, stop it first:

```bash
Ctrl + C
```

Then remove all resources created by Skaffold:

```bash
skaffold delete
```

This deletes all Kubernetes resources that were deployed using your `skaffold.yaml`.

---

### Option 2: Verify Everything Has Been Removed

Check that no application resources are still running:

```bash
kubectl get all
kubectl get ingress
```

If everything was deleted successfully, you should no longer see your application's:

* Deployments
* Pods
* Services
* Ingress

---

### Option 3: Start Fresh

Once the cluster is clean, simply start Skaffold again:

```bash
skaffold dev
```

Skaffold will:

1. Build your Docker images.
2. Deploy all Kubernetes manifests.
3. Start watching your source code for changes.

---

## 🛠️ Manual Cleanup (If Needed)

If some resources still exist because they were created outside of Skaffold, you can remove them manually.

Delete all workloads and services in the current namespace:

```bash
kubectl delete all --all
```

Delete all Ingress resources:

```bash
kubectl delete ingress --all
```

Verify the cluster again:

```bash
kubectl get all
kubectl get ingress
```

> **Note:** Use manual cleanup only when necessary. For normal development, `skaffold delete` is the recommended and safest way to clean up resources created by Skaffold.


# Things to Keep in Mind While Using Skaffold

This section covers common mistakes, best practices, and important notes that will save you hours of debugging.

---

# 1. Keep `skaffold dev` Running

Start Skaffold once:

```bash
skaffold dev
```

Do **not** stop and restart it after every code change.

Skaffold continuously watches your project for changes.

Workflow:

```text
Start Skaffold
      │
      ▼
Edit Code
      │
      ▼
Save File
      │
      ▼
Skaffold Sync / Rebuild
      │
      ▼
Application Updated
```

---

# 2. Sync Only Copies Files

File Sync **does not restart your application**.

It only copies changed files into the running container.

If your application is started using:

```dockerfile
CMD ["node", "server.js"]
```

the file will be copied but Node.js will continue running the old code.

For development, use:

```dockerfile
CMD ["npm", "run", "dev"]
```

where `npm run dev` starts **Nodemon**.

Then the workflow becomes:

```text
Save File
      │
      ▼
Skaffold Sync
      │
      ▼
Nodemon Detects Change
      │
      ▼
Application Restarts
```

---

# 3. Sync Does NOT Work for Everything

Sync is only for files like:

- JavaScript
- TypeScript
- CSS
- HTML
- JSON (if configured)

If you change:

- Dockerfile
- package.json
- package-lock.json
- npm dependencies
- Environment variables
- Base image

Skaffold must rebuild the image.

---

# 4. When a Rebuild is Required

A rebuild is required after changing:

- Dockerfile
- package.json
- package-lock.json
- Installing or removing packages
- Node version
- Environment variables used during image build

A normal JavaScript code change does **not** require rebuilding if Sync is configured.

---

# 5. Don't Use `localhost` Between Services

Inside Kubernetes:

❌ Wrong

```javascript
http://localhost:3000
```

or

```javascript
http://localhost:8080
```

`localhost` always refers to the current Pod.

Use the Kubernetes Service name instead.

✅ Correct

```javascript
http://core-service/count
```

or

```javascript
http://notification-service
```

---

# 6. Use the Service Port

Suppose your Service is:

```yaml
ports:
  - port: 80
    targetPort: 3000
```

Clients inside Kubernetes should call:

```text
http://core-service/count
```

or

```text
http://core-service:80/count
```

NOT

```text
http://core-service:3000/count
```

The Service listens on **port 80** and forwards traffic to **targetPort 3000** inside the container.

---

# 7. Keep Auto Save Sensible

Recommended:

```
files.autoSave = onFocusChange
```

This avoids restarting your application after every small pause while typing.

Using **After Delay** may trigger frequent Sync operations and unnecessary restarts.

---

# 8. Watch the Skaffold Terminal

Whenever you save a file, check the terminal.

You may see:

```
Syncing files...
```

or

```
Building image...
```

This tells you exactly what Skaffold is doing.

---

# 9. Production vs Development

Development Dockerfile:

- Uses Nodemon
- Optimized for fast development
- Works with File Sync

Production Dockerfile:

- Uses Node.js
- Smaller
- Faster
- No file watching
- No development dependencies

Avoid using development images in production.

---

# 10. Restart Skaffold Only When Necessary

Normally, you should **not** restart Skaffold.

Restart it only if:

- Skaffold crashes
- Kubernetes cluster restarts
- Docker Desktop restarts
- You intentionally stop it
- You make major configuration changes that require a fresh session

---

# 11. Read the Error Carefully

Many Kubernetes problems become obvious once you read the error.

Examples:

```
ECONNREFUSED
```

Application is unreachable.

```
ImagePullBackOff
```

Image cannot be downloaded.

```
CrashLoopBackOff
```

Container keeps crashing.

```
Pending
```

Scheduler cannot place the Pod.

The error message usually points directly toward the problem.

---

# 12. Verify Before Assuming

Useful commands:

```bash
kubectl get pods

kubectl get svc

kubectl get deployments

kubectl get ingress

kubectl logs <pod-name>

kubectl describe pod <pod-name>
```

These commands often reveal the issue much faster than guessing.

---

# Final Advice

Skaffold is designed to improve your development experience—not replace your understanding of Kubernetes.

When something doesn't work:

1. Read the error message carefully.
2. Check the Skaffold terminal.
3. Verify your Pods and Services.
4. Understand **why** the issue occurred instead of only fixing it.

The better you understand the workflow, the easier Kubernetes debugging becomes.