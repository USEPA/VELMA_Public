const express = require('express');
const pug = require('pug')
const path = require('path');
const app = express();
const port = 8000;

app.set('view engine', 'pug');
app.use(express.static('public'))
//console.log(path.join(__dirname, 'docs', 'public'))
//app.use('docs', 'views')

app.get('/docs/index', (req, res) => {
  res.render('index');
})

app.get('/docs/version/:version/:category/:page', (req, res) => {
  console.log("Req params", req.params)
  console.log("Req URL", req.url)
  const {version, category, page} = req.params;
  const currentPath = req.url;
  const templatePath = path.join('version', version, category, `${page}.pug`);
  try {
    res.render(templatePath, {currentPath});
  } catch (error) {
    res.status(404).send('Page Not Found.', templatePath)
  }
})

// app.use('/2.0', routes_2_0);
// use this as an example https://github.com/expressjs/express/blob/master/examples/ejs/index.js
// already have express and pug installed just need to go from there.
app.listen(port, () => {
    console.log(`Running on port ${port}`);
})