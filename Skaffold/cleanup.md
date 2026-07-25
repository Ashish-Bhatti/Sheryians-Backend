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
