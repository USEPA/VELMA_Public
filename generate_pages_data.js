const fs = require('fs');
const path = require('path');
const pug = require('pug');

// Directory containing Pug files
const baseDir = path.join(__dirname, 'views', 'version');

// Function to recursively find all Pug files
function getAllPugFiles(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    let pugFiles = [];

    for (const file of files) {
        if (file.isDirectory()) {
            pugFiles = pugFiles.concat(getAllPugFiles(path.join(dir, file.name)));
        } else if (file.name.endsWith('.pug')) {
            pugFiles.push(path.join(dir, file.name));
        }
    }

    return pugFiles;
}

// Extract content from `div.grid-body-content`
function extractGridBodyContent(pugFilePath) {
    // const compiledFunction = pug.compileFile(pugFilePath);
    // const html = compiledFunction(); // Render Pug to HTML
    var html = pug.renderFile(pugFilePath);
    const match = html.match(/<div class="grid-body-content">([\s\S]*?)<\/div>/);

    return match ? match[1].trim() : '';
}

// Generate pages JSON object
function generatePagesJson() {
    const pages = [];
    const pugFiles = getAllPugFiles(baseDir);

    pugFiles.forEach((filePath) => {
        const content = extractGridBodyContent(filePath);
        if (content) {
            pages.push({
                url: '/' + path.relative(baseDir, filePath).replace(/\\/g, '/').replace('.pug', '.html'),
                title: path.basename(filePath, '.pug'),
                content,
            });
        }
    });

    return pages;
}

// Write pages JSON to file
const pagesJson = generatePagesJson();
console.log(pagesJson);
fs.writeFileSync('search-index.json', JSON.stringify(pagesJson, null, 2));

console.log('Search index generated successfully!');
