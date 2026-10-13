# to use terminal we need to setup node-pty in backend - day-172 Auth - 01:17
- node-pty is a Node.js library that provides forkpty(3) bindings to spawn processes with pseudoterminal (PTY) file descriptors.

- update the docker image since node-pty need extra package to run
- install the node-pty package inside the sandbox/agents
npm install node-pty
- install socket.io so we can interact with node-pty through our terminal

# we will use xterm js in frontend to create a terminal 