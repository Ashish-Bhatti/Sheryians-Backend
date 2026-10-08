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
    try {
        const { message, projectId } = req.body;
        const response = await agent.invoke(
            {
                messages: [
                    {
                        role: 'user',
                        content: message,
                    },
                ],
            },
            {
                context : {
                    projectId
                }
            }
        );
        res.status(200).json(response);
    } catch (error) {
        console.error('Error occurred while invoking agent:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default agentRouter;
