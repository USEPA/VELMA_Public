const fs = require('fs');
const path = require('path');
const markdownToPug = require('markdown-to-pug');

function convertMdToPug() {
  const viewsDir = './views';
  fs.readdir(viewsDir, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
      if (path.extname(file) === '.md') {
        const filePath = path.join(viewsDir, file);
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) throw err;

          const pugContent = [
            'extends layout.pug',
            'block content',
            markdownToPug(data)
          ].join('\n');

          fs.writeFile(
            path.join(viewsDir, `${file.replace(/\.md$/, '')}.pug`),
            pugContent,
            err => {
              if (err) throw err;
            }
          );
        });
      }
    });
  });
}