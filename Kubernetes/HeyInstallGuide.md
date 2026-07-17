# Installing Hey (HTTP Load Testing Tool) on Windows

`hey` is a lightweight HTTP load generator that lets you stress test your APIs and web applications. It's especially useful when learning **Docker**, **Kubernetes**, **Horizontal Pod Autoscaling (HPA)**, and performance testing.

---

## Step 1: Download `hey`

Download the latest Windows binary from the official GitHub repository:

https://github.com/rakyll/hey

Move the downloaded executable to a folder where you'll keep your command-line tools.

Example:

```text
C:\Users\<YourUsername>\Tools\
```

Rename the file to:

```text
hey.exe
```

Your folder should look like:

```text
C:\Users\Ashu\Tools\
└── hey.exe
```

---

## Step 2: Add the folder to your PATH

Instead of manually editing the Environment Variables window, you can add the folder to your **User PATH** using PowerShell.

Open **PowerShell** and run:

```powershell
[Environment]::SetEnvironmentVariable(
    "Path",
    $env:Path + ";C:\Users\Ashu\Tools",
    "User"
)
```

> **Note:** Replace `C:\Users\Ashu\Tools` with the folder where you stored `hey.exe`.

---

## Step 3: Restart PowerShell

Close **all** PowerShell windows and open a new one.

This reloads your updated PATH.

---

## Step 4: Verify the Installation

Check that Windows can locate `hey`:

```powershell
where.exe hey
```

Expected output:

```text
C:\Users\Ashu\Tools\hey.exe
```

Now run:

```powershell
hey
```

You should see the usage information:

```text
Usage: hey [options...] <url>
```

Congratulations! 🎉 `hey` is now installed and available from any terminal.

---

# Basic Usage

## Send 100 requests

```powershell
hey -n 100 http://localhost
```

---

## Send 1000 requests with 100 concurrent users

```powershell
hey -n 1000 -c 100 http://localhost
```

---

## Generate traffic for 30 seconds

```powershell
hey -z 30s http://localhost
```

---

## Generate traffic for 2 minutes with 50 concurrent users

```powershell
hey -z 2m -c 50 http://localhost
```

---

## Send a POST request

```powershell
hey -m POST `
    -d "{\"name\":\"Ashu\"}" `
    -T "application/json" `
    http://localhost/api/users
```

---

# Kubernetes Example

Generate load on your application:

```powershell
hey -z 2m -c 100 http://localhost
```

In another terminal, monitor resource usage:

```powershell
while ($true) {
    Clear-Host
    kubectl top pods
    Start-Sleep -Seconds 5
}
```

Or monitor node usage:

```powershell
while ($true) {
    Clear-Host
    kubectl top nodes
    Start-Sleep -Seconds 5
}
```

This lets you watch CPU and memory usage increase in real time as your application handles traffic.

---

# Why Use `hey`?

- Simple HTTP load testing
- Benchmark REST APIs
- Test Kubernetes Deployments and Services
- Observe Horizontal Pod Autoscaler (HPA) behavior
- Measure application performance under concurrent traffic
- Lightweight and easy to use