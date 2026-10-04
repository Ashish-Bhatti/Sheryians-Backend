import axios from 'axios';
import https from 'https';
import { tool } from 'langchain';
import { z } from 'zod';

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

export const listFiles = tool(
    async () => {
        console.log('listFiles is called');
        const response = await axios.get('https://01a1079a-3ed7-7192-a45d-97812e91b9e3.agent.localhost/list-files', {
            httpsAgent,
        });

        console.log('listFiles is called', JSON.stringify(response.data));

        return JSON.stringify(response.data.files);
    },
    {
        name: 'list_files',
        description: 'List all the files in the project directory.',
        schema: z.object({}),
    }
);

export const readFile = tool(
    async ({ files = [] }) => {
        console.log('readfile is called');

        const response = await axios.get('https://01a1079a-3ed7-7192-a45d-97812e91b9e3.agent.localhost/read-file?files=' + files.join(','), {
            httpsAgent,
        });

        console.log('readfile is called', JSON.stringify(response.data));

        return JSON.stringify(response.data);
    },
    {
        name: 'read_files',
        description: 'Read the contents of specified files. This is useful for understanding the content of files that are relevant to the task at hand.',
        schema: z.object({
            files: z.array(z.string()).describe('The list of files absolute paths to read. These should be files that were listed using the list_files tool or created later'),
        }),
    }
);

export const updateFiles = tool(
    async ({ files }) => {
        console.log('updateFiles is called');

        const response = await axios.patch(
            'https://01a1079a-3ed7-7192-a45d-97812e91b9e3.agent.localhost/update-files',
            {
                updates: files,
            },
            {
                httpsAgent,
            }
        );

        console.log('updatefile is called', JSON.stringify(response.data.results));

        return JSON.stringify(response.data.results);
    },
    {
        name: 'update_files',
        description:
            'Update the contents of specified files. This is useful for making changes to files based on the requirements of the task at hand. this tool can also use to create new files by providing a new file name in the file field and the content to be added in the content field.',
        schema: z.object({
            files: z
                .array(
                    z.object({
                        file: z.string().describe('The absolute path of the file to update'),
                        content: z.string().describe('The new content for the file, the content should support json format.'),
                    })
                )
                .describe('The list of files to update and their new contents'),
        }),
    }
);
