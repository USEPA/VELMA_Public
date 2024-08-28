const fs = require('fs');
const path = require('path');
const pug = require('pug');

function compileAndSavePugFiles(pugDir, htmlDir) {
    if (!fs.existsSync(htmlDir)) {
        fs.mkdirSync(htmlDir, { recursive: true });
    }

    fs.readdir(pugDir, { withFileTypes: true }, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            const pugFilePath = path.join(pugDir, file.name);
            const relativePath = path.relative(pugDir, pugFilePath);
            const htmlFilePath = path.join(htmlDir, relativePath).replace(/\.pug$/, '.html');

            if (file.isDirectory()) {
                compileAndSavePugFiles(pugFilePath, path.join(htmlDir, file.name)); // Recursive call for subdirectories
            } else if (path.extname(pugFilePath) === '.pug') {
                var html = pug.renderFile(pugFilePath, options={'pretty':true});
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
    });
}

const pugDir = './views';
const htmlDir = './docs';
compileAndSavePugFiles(pugDir, htmlDir);
console.log("Finished compiling pug files");
// fs.copyFile('./public/style.css', './docs', (err) => {
//     if (err) throw err;
//     console.log("Style file copied to public!")
// });