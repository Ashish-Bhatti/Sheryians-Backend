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
        const response = await axios.get('https://01a1115a-69a6-7172-901c-71a4fcae6aff.agent.localhost/list-files', {
            httpsAgent,
        });

        console.log('listFiles is called', JSON.stringify(response.data));

        return JSON.stringify(response.data.files);
    },
    {
        name: 'list_files',
        description:
            'Discover available project files. This tool ONLY lists files. It does not read or modify files. After using this tool, you must use read_files to inspect the relevant file before making changes.',
        schema: z.object({}),
    }
);

export const readFile = tool(
    async ({ files = [] }) => {
        console.log('readfile is called');

        const response = await axios.get('https://01a1115a-69a6-7172-901c-71a4fcae6aff.agent.localhost/read-file?files=' + files.join(','), {
            httpsAgent,
        });

        console.log('readfile is called', JSON.stringify(response.data));

        return JSON.stringify(response.data);
    },
    {
        name: 'read_files',
        description: 'Read the contents of project files before modifying them. After reading the relevant file, use update_files to apply the requested change.',
        schema: z.object({
            files: z.array(z.string()).describe('The list of files absolute paths to read. These should be files that were listed using the list_files tool or created later'),
        }),
    }
);

export const updateFiles = tool(
    async ({ files }) => {
        console.log('updateFiles is called');

        const response = await axios.patch(
            'https://01a1115a-69a6-7172-901c-71a4fcae6aff.agent.localhost/update-files',
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
            'Apply code changes to project files. You MUST use this tool to complete any request that asks to change, modify, fix, or create code. Never claim a code change is complete without successfully calling this tool. This tool can also be used to create new files by providing a new file name in the file field and the content to be added in the content field.',
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
