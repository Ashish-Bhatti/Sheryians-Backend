import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

const WORKING_DIR = '/workspace';

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello, World!',
        status: 'success',
    });
});

app.get('/list-files', async (req, res) => {
    const elements = await fs.promises.readdir(WORKING_DIR);
    res.status(200).json({
        message: 'Elements listed successfully',
        files: elements,
    });
});

/**
 * @route GET /read-file
 * @desc Read the content of all file requested in the query parameters 'files' and return their content as a JSON object.
 * - eg. /read-file?files=file1.txt,/src/file2.txt
 */
app.get('/read-file', async (req, res) => {
    const files = req.query.files;

    if (!files) {
        return res.status(400).json({
            message: 'No files specified in the query parameters',
            status: 'error',
        });
    }

    const fileList = files.split(',');

    const results = await Promise.all(
        fileList.map(async (file) => {
            const filePath = `${WORKING_DIR}/${file}`;
            try {
                const content = await fs.promises.readFile(filePath, 'utf-8');
                return {
                    [filePath]: content,
                };
            } catch (err) {
                return {
                    [filePath]: `Error reading file: ${err.message}`,
                };
            }
        })
    );

    res.status(200).json({
        message: 'Files read successfully',
        files: results,
    });
});

/**
 * @route PATCH /update-files
 * @description Updates the content of files specified in the request body. The request body should container a property 'updates' with a JSON Array of object, each object should have a 'file' property specifying the file path (relative to the working directory) and a 'content' property specifying the new content for the file.
 * - eg. {
 *      "/file1.txt": "New content for file 1",
 */
app.patch('/update-files', async (req, res) => {
    const updates = req.body.updates;

    if (!updates || !Array.isArray(updates)) {
        return res.status(400).json({
            message: 'Invalid request body. Expected a JSON object with an "updates" property containing an array of file updates.',
            status: 'error',
        });
    }

    const results = await Promise.all(
        updates.map(async (update) => {
            const { file, content } = update;
            const filePath = path.join(WORKING_DIR, file);
            try {
                await fs.promises.writeFile(filePath, content, 'utf-8');
                return {
                    [filePath]: 'File updated successfully',
                };
            } catch (err) {
                return {
                    [filePath]: `Error updating file : ${err.message}`,
                };
            }
        })
    );

    res.status(200).json({
        message: 'File update results',
        results,
    });
});

export default app;
