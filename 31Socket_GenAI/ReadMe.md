1. Before Socket.IO (HTTP)
With HTTP, communication is request → response.
```
User A
   |
   |  GET /messages
   ↓
Server
   |
   |  Response
   ↓
User A
 ```

The server cannot send data whenever it wants.
If User B sends a message:``` User B ---> Server ```
the server cannot automatically push that message to User A through normal HTTP.

User A must keep asking:
```
User A ---> Server
User A ---> Server
User A ---> Server
```
This is called polling.

2. With Socket.IO
First, both users establish a persistent connection with the server:
```
User A <------> Server
User B <------> Server

```

Now the connection stays open.
When User B sends a message: ``` User B ---> Server ```
the server can instantly push it to User A: ``` User B ---> Server ---> User A ```
without User A making another request.


---------------------------------------------------------------------------------------------


1. Before Socket.IO:
- We used HTTP.
- Communication was request-response based.
- The server could only respond when the client made a request.

2. With Socket.IO:
- User A and User B maintain a persistent connection with the server.
- The server can send data to connected users at any time.
- This enables real-time features like chat, notifications, live updates, multiplayer games, etc.

=> The key idea is:
HTTP = "Ask me and I'll answer."
Socket.IO = "Stay connected, and I'll notify you whenever something happens."


=> how to initialize the socket.io
https://socket.io/docs/v4/server-initialization/#with-express


----------------------------------------------------------------

io => means we are talking about server
socket => means we are taling about a single user

on => event ko listen krna (like event listener)
emit => fire the event

