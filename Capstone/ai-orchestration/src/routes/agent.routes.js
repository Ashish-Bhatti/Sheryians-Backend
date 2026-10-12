import { Router } from 'express';
import agent from '../agents/code.agent.js';

const agentRouter = Router();

/* it should accept  a post request with a json body containing a message field, and then it should invoke the agent with that message and return the response. For example, if the request body is:
{
  "message":  "change the theme color to black"
}

// when we work with invoke, we can also pass a config object to the invoke method, which can contain a context field. The context field can be used to pass additional information to the agent, such as the projectId. For example, if we want to pass the projectId to the agent, we can do it like this:
const response = await agent.invoke(
{},{ context: { projectId: "12345" } }
)
*/
agentRouter.post('/invoke', async (req, res) => {
    const { message, projectId } = req.body;

    // this is SSE (Server Sent Events) endpoint, so we need to set the appropriate headers. It is used to send a stream of events from the server to the client. The client can listen to these events and update the UI accordingly. It is useful for long-running tasks, such as invoking an agent that may take some time to complete.
    // it is already built in express, so we just need to set the headers and then use res.write to send the events. The client can listen to these events using the EventSource API.
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });

    const writer = (text) => res.write(text);

    try {
        const response = await agent.stream(
            {
                messages: [
                    {
                        role: 'user',
                        content: message,
                    },
                ],
            },
            {
                context: {
                    projectId,
                    writer,
                },
                streamMode: 'values',
            }
        );

        for await (const chunk of response) {
            console.log(chunk);
            // send the chunk to the client as an SSE event. The client can listen to these events using the EventSource API.
            res.write(`data: ${JSON.stringify(chunk)}\n\n`);
        }
        res.write('data: [DONE]\n\n');
        res.end();
    } catch (error) {
        console.error('Error occurred while invoking agent:', error);
        if (res.headersSent) {
            // SSE response has already started; don't send JSON.
            res.end();
            return;
        }

        res.status(500).json({ error: 'Internal server error' });
    }
});

export default agentRouter;
