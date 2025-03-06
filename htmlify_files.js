const fs = require('fs');
const path = require('path');
const pug = require('pug');

function compileAndSavePugFiles(pugDir, htmlDir, files) {
    if (!fs.existsSync(htmlDir)) {
        fs.mkdirSync(htmlDir, { recursive: true });
    }

    

    files.forEach(file => {
        const pugFilePath = path.join(pugDir, file);
        const relativePath = path.relative(pugDir, pugFilePath);
        const htmlFilePath = path.join(htmlDir, relativePath).replace(/\.pug$/, '.html');

        if (path.extname(pugFilePath) === '.pug') {
            var html = pug.renderFile(pugFilePath);
            fs.writeFile(htmlFilePath, html, (writeErr) => {
                if (writeErr) throw writeErr;
                console.log(`Compiled ${pugFilePath} to ${htmlFilePath}`);
            });
        } else {
            fs.writeFile(htmlFilePath, file, (writeErr) => {
                if (writeErr) throw writeErr;
                console.log(`Compiled ${file} to ${htmlFilePath}`);
            })
        }
    });
}

const pugDir = './views';
const htmlDir = './docs';
const files = ['LccmTranslatorUtility_Overview.pug']
compileAndSavePugFiles(pugDir, htmlDir, files);
console.log("Finished compiling pug files");
// fs.copyFile('./public/style.css', './docs', (err) => {
//     if (err) throw err;
//     console.log("Style file copied to public!")
// });