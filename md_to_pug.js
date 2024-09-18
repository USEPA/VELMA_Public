const fs = require('fs');
const path = require('path');
const markdownToPug = require('markdown-to-pug');

function convertMdToPug() {
  const viewsDir = './views/markdown'; // path.join(__dirname, 'views', 'markdown')
  fs.readdir(viewsDir, (err, files) => {
    if (err) throw err;

    // for all the files in the markdown subdir
    files.forEach(file => {
      // if markdown file
      if (path.extname(file) === '.md') {
        const filePath = path.join(viewsDir, file);
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) throw err;
          
          // add pug template to beginning of markdown data
          const pugContent = [
            'extends layout.pug',
            'block content',
            markdownToPug(data)
          ].join('\n');

          // write new pug data to views dir, file has same name but we change the extension
          fs.writeFile(
            path.join(viewsDir, `${file.replace(/\.md$/, '')}.pug`),
            pugContent,
            err => {
              if (err) throw err;
            }
          );
        });
      }
      // else if we have images in the markdown folder move those to the public docs folder
      if (path.extname(file) === '.png' ||path.extname(file) === '.jpg' || path.extname(file) === '.gif') {
        fs.rename(
          path.join(viewsDir, file),
          path.join('./docs/public/', file),
          err => {
            if (err) throw err;
        });
      };
    });
    
  });
}

convertMdToPug()