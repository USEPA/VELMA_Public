const fs = require('fs').promises;
const path = require('path');
const html2pug = require('html2pug');
const cheerio = require('cheerio');

const docsDir = path.join(__dirname, 'docs');
const viewsDir = path.join(__dirname, 'views');

// Read the directories
fs.readdir(docsDir)
    .then((docsFiles) => {
        return fs.readdir(viewsDir).then((viewsFiles) => {
            // Compare the file names
            const pugFiles = viewsFiles.map(file => path.parse(file).name);
            const htmlFiles = docsFiles.filter(file => path.extname(file) === '.html');
            const filesToConvert = htmlFiles.filter(file => !pugFiles.includes(path.parse(file).name));

            // Convert the HTML files to Pug sequentially
            const processNextFile = async () => {
                if (filesToConvert.length > 0) {
                    const file = filesToConvert.shift();
                    const htmlFile = path.join(docsDir, file);
                    const pugFile = path.join(viewsDir, path.parse(file).name + '.pug');

                    const html = await fs.readFile(htmlFile, 'utf8');
                    const $ = cheerio.load(html);
                    const mainBodyContent = $('.main_body').html();
                    const pug = html2pug(mainBodyContent, { tabs: true, doubleQuotes: true, fragment: true });

                    await fs.writeFile(pugFile, pug);
                    console.log(`${file} has been converted to ${pugFile}.pug asyncronously`);

                    // Recursively call the function for the next file
                    processNextFile();
                }
            };

            // Start processing the first file
            processNextFile();
        });
    })
    .catch((err) => {
        throw err;
    });