const express = require('express');
const pug = require('pug')
const path = require('path');
const app = express()
const port = 3000

// For future latex formula integrations
// http://blog.dreasgrech.com/2009/12/jslatex-jquery-plugin-to-directly-embed.html

// helpful link https://codebeautify.org/html-to-pug-converter
app.set('view engine', 'pug');
app.get('/', (req, res) => {
    res.render('intro', { pageTitle: 'Intro' })
  })

app.get('/changes', (req, res) => {
  res.render('2-0Changes', { pageTitle: 'Changes from VELMA 1.0'})
})

app.get('/about', (req, res) => {
  res.render('about', { pageTitle: 'About this Manual'})
})

app.get('/files', (req, res) => {
  res.render('files', { pageTitle: 'Input Files'})
})
// use this as an example https://github.com/expressjs/express/blob/master/examples/ejs/index.js
// already have express and pug installed just need to go from there.
app.listen(port, () => {
    console.log(`Running on port ${port}`);
})