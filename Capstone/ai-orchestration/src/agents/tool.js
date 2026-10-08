import axios from 'axios';
import { tool } from 'langchain';
import { z } from 'zod';

// when we work with langchain we can pass 2 parameters to our agent. First one should be a object containing the messages and the second one should be a config object. The config object can contain a context field. The context field can be used to pass additional information to the agent, such as the projectId. For example, if we want to pass the projectId to the agent, we can do it like this:
export const listFiles = tool(
    async ({}, config) => {
        console.log("===============================================================");
        console.log('listFiles is called');
        console.log("===============================================================");
        const response = await axios.get(`http://sandbox-service-${config.context.projectId}:3000/list-files`);

        console.log("===============================================================");
        console.log('listFiles is called', JSON.stringify(response.data));
        console.log("===============================================================");

        return JSON.stringify(response.data.files);
    },
    {
        name: 'list_files',
        description:
            'Discover available project files. This tool ONLY lists files. It does not read or modify files. After using this tool, you must use read_files to inspect the relevant file before making changes.',
        schema: z.object({}),
    },)


export const readFile = tool(
    async ({ files = [] }, config) => {
        console.log("===============================================================");
        console.log('readfile is called');
        console.log("===============================================================");

        const response = await axios.get(`http://sandbox-service-${config.context.projectId}:3000/read-file?files=` + files.join(','));

        console.log("===============================================================");
        console.log('readfile is called', JSON.stringify(response.data));
        console.log("===============================================================");

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
    async ({ files }, config) => {
        console.log("===============================================================");
        console.log('updateFiles is called');
        console.log("===============================================================");

        const response = await axios.patch(
            `http://sandbox-service-${config.context.projectId}:3000/update-files`,
            {
                updates: files,
            }
        );

        console.log("===============================================================");
        console.log('updatefile is called', JSON.stringify(response.data.results));
        console.log("===============================================================");

        return JSON.stringify(response.data.results);
    },
     {
        name: "update_files",
        description: "Update the contents of specified files. This is useful for making changes to files based on the requirements of the task at hand. this tool can also use to create new files by providing a new file name in the file field and the content to be added in the content field.",
        schema: z.object({
            files: z.array(z.object({
                file: z.string().describe("The absolute path of the file to update"),
                content: z.string().describe("The new content for the file, the content should support json format.")
            })).describe("The list of files to update and their new contents")
        })
    }
);


// import https from 'https';

// HTTPS agent used when communicating with services that use HTTPS
// and may have self-signed/untrusted certificates.
//
// We are currently using HTTP between our Kubernetes services,
// so this is not needed right now.
//
// If we switch the service back to HTTPS in the future, restore:
//
// import https from 'https';
//
// const httpsAgent = new https.Agent({
//     rejectUnauthorized: false,
// });
//
// Then pass `httpsAgent` in the Axios request options.
//
// IMPORTANT:
// If you see an error like:
//   EPROTO
//   tls_validate_record_header
//   wrong version number
//
// Check whether the URL uses `https://` while the target server
// is actually serving plain `http://`. This was the cause of this issue.

/*
import axios from 'axios';
// import https from 'https';
import { tool } from 'langchain';
import { z } from 'zod';
 */