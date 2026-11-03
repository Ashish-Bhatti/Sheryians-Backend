# Redis for sandbox lifecycle

Redis tracks active sandbox sessions and lets the sandbox server clean up
Kubernetes resources when a session expires. Both the sandbox server and the
router connect to Redis using `ioredis` and the `REDIS_URL` environment variable.

## Where Redis is used

- **Sandbox server** (`sandbox/server/src/config/redis.js`) creates a Redis key
  when `/api/sandbox/start` starts a sandbox. The key is
  `sandbox:<sandboxId>`, its value records the active status, and it expires
  after 120 seconds.
- **Router** (`sandbox/router/config/redis.js`) refreshes that key's 120-second
  expiry when it receives a request for the sandbox's preview or agent host.
  Requests routed through the router therefore keep an active sandbox alive.
- **Sandbox server expiration subscriber** listens for expired-key events on
  Redis database 0. When a `sandbox:<sandboxId>` key expires, it deletes the
  matching Kubernetes pod and Service.

If a sandbox receives no router traffic for 120 seconds, its key expires and
the server attempts to remove its Kubernetes resources.

## Setup

1. Create or obtain a Redis instance. Copy its complete connection URL, including
   the scheme, credentials, hostname, and port, from your Redis provider. Use the
   provider's TLS URL when TLS is required.
2. Make the URL available as `REDIS_URL` to both the sandbox server and router.
   In Kubernetes, both Deployments read the `REDIS_URL` key from the Secret
   named `database` (`k8s/sandbox-deployment.yml` and
   `k8s/router-deployment.yml`).
3. Ensure that the `database` Secret contains `REDIS_URL` as well as any other
   keys required by the services. If creating the Secret from scratch, for
   example:

   ```powershell
   kubectl create secret generic database `
     --from-literal=REDIS_URL="<your-redis-connection-url>"
   ```

   When setting up the full cluster, include the other database connection keys
   required by your Deployments when creating this Secret.
   If `database` already exists, add `REDIS_URL` to that Secret without
   removing its existing keys. Do not commit real connection URLs or passwords
   to source control.
4. Deploy or restart the sandbox server and router so they receive the Secret
   value. For example, with Skaffold, run `skaffold dev` after the Secret is
   available.

For local runs, set `REDIS_URL` in the environment of both services before
starting them. Both packages already include the `ioredis` dependency.

## Expiration notifications

The sandbox server subscribes to the Redis key-expiration channel for database
0 and enables the `Ex` keyspace notification flags at startup. The Redis
instance must permit this configuration. If a managed Redis provider does not
allow `CONFIG SET`, enable key-expiration notifications (`Ex`) through the
provider's Redis configuration; without those events, expired sandbox keys
will not trigger Kubernetes cleanup.