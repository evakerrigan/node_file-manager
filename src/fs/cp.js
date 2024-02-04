import fs from 'fs';
import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const directory = path.join(__dirname, 'files');
// const filesCopy = path.join(__dirname, 'files-copy');

// const errorText = 'FS operation failed';

const copy = async () => {
    // Write your code here 

        try {
            // await fs.promises.mkdir(filesCopy);
            // const items = await fs.promises.readdir(directory);
            // for (const element of items) {
            //     await fs.promises.copyFile(
            //         path.join(directory, element),
            //         path.join(filesCopy, element)
            //     );
            // }
        } catch (err) {
            // throw new Error(errorText);
        }

};

await copy();