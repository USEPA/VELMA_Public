const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
// const fs = require(['fs']);
// const path = require(['path']);
// const cheerio = require(['cheerio']);
// import {path} from '../../../node_modules/path-parse';
// import {fs} from '../../../node_modules/fs.realpath';
// import {cheerio} from '../../../node_modules/cheerio';
function displayResults(results) {
    const dropdown = document.createElement('ul');
    dropdown.classList.add('search-results');

    for (const result of results) {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = result.url;
        link.textContent = result.title;
        listItem.appendChild(link);
        dropdown.appendChild(listItem);
    }

    const searchBar = document.querySelector('.search-bar');
    searchBar.appendChild(dropdown);
}

function getMainBodyData() {
    const docs_data = {};
    const docsDir = path.join(__dirname, '../../');
    fs.readdir(docsDir, (err, files) => {
        //console.log(files);
        if (err) throw err;
        files.forEach(file => {
            if (path.extname(file) === '.html') {
                //console.log(file.toString())
                const htmlFile = path.join(docsDir, file);
                const html = fs.readFileSync(htmlFile, 'utf8')
                const main_data = cheerio.load(html).extract({main_body: '.main_body'});
                console.log("main body data", main_data);
                // const main_data = $.extract({
                //     main_body: '.main_body'
                // });
                file_name = file.toString().replace('.html', '')
                docs_data[file_name] = main_data;
            }
            
        });
    });
    return docs_data;
}


pages = getMainBodyData();
console.log("--Pages", pages);
//console.log("Memory size", Object.entries(pages).length)

// document.getElementById('search').addEventListener('input', async (event) => {
//     const searchTerm = event.target.value.toLowerCase();
//     const results = pages.filter(page => page.text.toLowerCase().includes(searchTerm));

//     displayResults(results);
// });

