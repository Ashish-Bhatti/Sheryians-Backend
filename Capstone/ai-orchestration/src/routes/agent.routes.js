import { Router } from 'express';
import agent from '../agents/code.agent.js';

const agentRouter = Router();

/* it should accept  a post request with a json body containing a message field, and then it should invoke the agent with that message and return the response. For example, if the request body is:
{
  "message":  "change the theme color to black"
}
*/
agentRouter.post('/invoke', async (req, res) => {
    try {
        const { message } = req.body;
        const response = await agent.invoke({
            messages: [
                {
                    role: 'user',
                    content: message,
                },
            ],
        });
        res.status(200).json(response);
    } catch (error) {
        console.error('Error occurred while invoking agent:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default agentRouter;
