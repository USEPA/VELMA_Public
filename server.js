const express = require('express');
const pug = require('pug')
const path = require('path');
const app = express()
const port = 3000

// For future latex formula integrations
// http://blog.dreasgrech.com/2009/12/jslatex-jquery-plugin-to-directly-embed.html

// helpful link https://codebeautify.org/html-to-pug-converter
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index', { pageTitle: 'Home' })
})

app.get('/intro', (req, res) => {
    res.render('intro', { pageTitle: 'Intro' })
  })

app.get('/changes', (req, res) => {
  res.render('2-0Changes', { pageTitle: 'Changes from VELMA 1.0'})
})

app.get('/about', (req, res) => {
  res.render('about', { pageTitle: 'About this Manual'})
})

app.get('/files', (req, res) => {
  res.render('input_files', { pageTitle: 'Input Files'})
})

// app.get('/file-details', (req, res) => {
//   res.render('input_files_details', { pageTitle: 'Input File Details'})
// })

app.get('/sim-config', (req, res) => {
  res.render('new_sim_config', { pageTitle: 'New Sim Config'})
})

app.get('/param-config', (req, res) => {
  res.render('parameter_config', { pageTitle: 'Parameter Config'})
})

app.get('/appendix-1', (req, res) => {
  res.render('appendix_1', { pageTitle: 'Appendix 1'})
})

app.get('/appendix-2', (req, res) => {
  res.render('appendix_2', { pageTitle: 'Appendix 2'})
})

app.get('/appendix-3', (req, res) => {
  res.render('appendix_3', { pageTitle: 'Appendix 3'})
})

app.get('/appendix-4', (req, res) => {
  res.render('appendix_4', { pageTitle: 'Appendix 4'})
})

app.get('/appendix-5', (req, res) => {
  res.render('appendix_5', { pageTitle: 'Appendix 5'})
})

app.get('/appendix-6', (req, res) => {
  res.render('appendix_6', { pageTitle: 'Appendix 6'})
})

app.get('/appendix-7', (req, res) => {
  res.render('appendix_7', { pageTitle: 'Appendix 7'})
})
// use this as an example https://github.com/expressjs/express/blob/master/examples/ejs/index.js
// already have express and pug installed just need to go from there.
app.listen(port, () => {
    console.log(`Running on port ${port}`);
})