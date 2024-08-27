// script to grab md docs and create html like the current npm run build script
// add to build-utils and build-info scripts to run this file after it does the md-to-pug stuff
// so that it renames the index.html files to the name of the folder it is in.

// script update_markdowns.js algorithm
// 1. walk through subdirectories in the 'docs' directory
// 2. once an index.html files is found rename the file to its parent directory name
// 3. move the renamed file to the 'docs' directory
const fs = require('fs');
const path = require('path');

// Function to walk through directories
function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        const curPath = path.join(dir, file);
        const stats = fs.statSync(curPath);

        // If it's a directory, call walk again
        if (stats.isDirectory()) {
            walk(curPath);
        } else if (file === 'index.html') { // If it's 'index.html'
            handleIndexHtml(curPath);
        }
    });
}

// Function to handle renaming and moving of 'index.html'
function handleIndexHtml(filePath) {
    const parentDirName = path.basename(path.dirname(filePath));
    const isRootIndexHtml = path.dirname(filePath) === path.join('docs');

    if (!isRootIndexHtml) {
        const docsDir = path.dirname(path.dirname(path.dirname(filePath)));
        const newFileName = `${parentDirName}.html`;
        const newPath = path.join(docsDir, newFileName);

        fs.renameSync(filePath, newPath);
        console.log(`Moved ${filePath} to ${newPath}`);
    } else {
        console.log(`Skipping ${filePath}, as it is the root index.html`);
    }
}

// Start walking from 'docs' directory
walk('docs');

// TODO still need to move all image files over to public directory