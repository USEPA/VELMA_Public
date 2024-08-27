const fs = require('fs');
const path = require('path');
const html2pug = require('html2pug');
const cheerio = require('cheerio');

const docsDir = path.join(__dirname, 'docs');
const viewsDir = path.join(__dirname, 'views');

// Read the directories
fs.readdir(docsDir, (err, docsFiles) => {
    if (err) throw err;

    fs.readdir(viewsDir, (err, viewsFiles) => {
        if (err) throw err;

        // Compare the file names
        const pugFiles = viewsFiles.map(file => path.parse(file).name);
        const htmlFiles = docsFiles.filter(file => path.extname(file) === '.html');
        const filesToConvert = htmlFiles.filter(file => !pugFiles.includes(path.parse(file).name));

        // Convert the HTML files to Pug
        filesToConvert.forEach(file => {
            const htmlFile = path.join(docsDir, file);
            const pugFile = path.join(viewsDir, path.parse(file).name + '.pug');

            const html = fs.readFileSync(htmlFile, 'utf8');
            const $ = cheerio.load(html);
            const mainBodyContent = $('.main_body').html();
            const pug = html2pug(mainBodyContent, { tabs: true, doubleQuotes: true, fragment: true });

            fs.writeFile(pugFile, pug, (err) => {
                if (err) throw err;
                console.log(`${file} has been converted to ${pugFile}.pug`);
            });
        });
    });
});
