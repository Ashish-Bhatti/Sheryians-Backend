# Installing Skaffold on Windows

Skaffold is a command-line tool developed by Google that automates the Kubernetes development workflow. It watches your source code, rebuilds Docker images, and redeploys your application whenever changes are detected.

Instead of manually running commands like:

- `docker build`
- `kubectl apply`
- `kubectl rollout restart`

Skaffold performs these steps automatically, making Kubernetes development much faster.

---

## Prerequisites

Before installing Skaffold, ensure you have:

- ✅ Docker Desktop installed
- ✅ Kubernetes enabled in Docker Desktop
- ✅ `kubectl` installed
- ✅ Docker Desktop running

Verify your setup:

```powershell
docker --version
kubectl version --client
kubectl config current-context
```

Expected context:

```text
docker-desktop
```

> **Note:** If you're using **Docker Desktop Kubernetes**, you **do not need Minikube**. Skaffold works directly with the `docker-desktop` Kubernetes cluster.

---

# Step 1: Download Skaffold

Download the latest Windows executable from GitHub:

https://github.com/GoogleContainerTools/skaffold/releases/latest

Download:

```text
skaffold-windows-amd64.exe
```

---

# Step 2: Rename the File

Rename

```text
skaffold-windows-amd64.exe
```

to

```text
skaffold.exe
```

---

# Step 3: Move it to Your Tools Folder

If you've been following the previous setup guides (HEY, Watch CLI, etc.), move the executable to:

```text
C:\Users\<YourUsername>\Tools
```

Example:

```text
C:\Users\Ashu\Tools
```

---

# Step 4: Add the Tools Folder to PATH (PowerShell)

If you've **already added** your `Tools` folder to PATH while installing **HEY** or **Watch**, you can **skip this step**.

Otherwise, open **PowerShell as Administrator** and run:

```powershell
[Environment]::SetEnvironmentVariable(
    "Path",
    $env:Path + ";C:\Users\Ashu\Tools",
    "Machine"
)
```

If you don't have administrator privileges, use the **User** environment variable instead:

```powershell
[Environment]::SetEnvironmentVariable(
    "Path",
    $env:Path + ";C:\Users\Ashu\Tools",
    "User"
)
```

Restart PowerShell after updating the PATH.

---

# Step 5: Verify Installation

Check whether Windows can find Skaffold:

```powershell
where skaffold
```

Expected output:

```text
C:\Users\Ashu\Tools\skaffold.exe
```

Verify the installed version:

```powershell
skaffold version
```

Example:

```text
v2.x.x
```

---

# Step 6: Verify Kubernetes Connection

Check your current Kubernetes context:

```powershell
kubectl config current-context
```

Expected output:

```text
docker-desktop
```

Check that your cluster is running:

```powershell
kubectl get nodes
```

Example:

```text
NAME               STATUS   ROLES           AGE
docker-desktop     Ready    control-plane   8d
```

---

# Step 7: Verify All Installed CLI Tools (Optional)

If you're storing all CLI tools inside the same **Tools** folder, verify them together:

```powershell
where hey
where watch
where skaffold
```

Example:

```text
C:\Users\Ashu\Tools\hey.exe
C:\Users\Ashu\Tools\watch.exe
C:\Users\Ashu\Tools\skaffold.exe
```

---

# Step 8: Run Skaffold

Navigate to your project directory (the one containing a `skaffold.yaml` file) and start development mode:

```powershell
skaffold dev
```

Skaffold will:

- Build your Docker image
- Deploy it to Kubernetes
- Watch your source code
- Automatically rebuild on changes
- Automatically redeploy your application

Stop the process with:

```text
Ctrl + C
```

---

# Useful Commands

### Show Skaffold Version

```powershell
skaffold version
```

### Start Development Mode

```powershell
skaffold dev
```

### Build and Deploy Once

```powershell
skaffold run
```

### Delete All Resources

```powershell
skaffold delete
```

### Render Kubernetes Manifests

```powershell
skaffold render
```

### Diagnose Configuration

```powershell
skaffold diagnose
```

---

# Troubleshooting

## `skaffold : The term 'skaffold' is not recognized`

The executable is either not in your PATH or PowerShell hasn't been restarted.

Verify:

```powershell
where skaffold
```

---

## Docker is Not Running

Error:

```text
Cannot connect to the Docker daemon
```

Start Docker Desktop and wait until Kubernetes is fully initialized.

---

## Kubernetes Cluster Not Found

Check the current context:

```powershell
kubectl config current-context
```

If necessary, switch to Docker Desktop:

```powershell
kubectl config use-context docker-desktop
```

---

## No Nodes Found

Verify that Kubernetes is enabled in Docker Desktop.

```powershell
kubectl get nodes
```

If no nodes appear, open Docker Desktop and ensure **Settings → Kubernetes → Enable Kubernetes** is turned on.

---

## Image Rebuilds Every Time

Skaffold uses Docker's build cache whenever possible. To improve build performance:

- Use a `.dockerignore` file.
- Avoid modifying unnecessary files.
- Keep dependency installation (`npm install`) in a separate Docker layer.

---

# Next Step

With Skaffold installed, you're ready to create a `skaffold.yaml` configuration file for your project. This enables a fast Kubernetes development workflow with automatic image builds, deployments, and live reload whenever you change your source code.