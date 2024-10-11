# New VELMA 2.2 Documentation

This is the develop branch for the VELMA documentation GitHub Pages website.

## Background

- PDF documentation were converted to .pug files and placed in the /views directory
- Run the `npm run build` command to compile .html pages

Run dev server with the following command to view .pug files in a local host

```
npm run dev
```

To turn .pug files into html simply run the following line:

```
node ./htmlify.js
```

## Converting Markdown files to pug

1. Place .md file that you want to convert into the views/markdown directory
2. Run the md_to_pug.js script

Either of these commands will work to run the script

`node md_to_pug.js`

`npm run md-to-pug`

## Pushing changes to GitHub Pages

Once you have made a change that alters the `docs` directory and want to update the GitHub Pages with this change here are the steps you need to take.

### Push changes from develop branch to GitHub

On develop branch run these commands:

```
git add .
git commit -m "{insert change description here}"
git push
```

### Switch to master branch

```
git checkout master
```

### Copy `docs` folder from develop to master

```
git checkout develop -- docs
```

### Push the docs folder to GitHub master branch

While still on the master branch run the following commands:

```
git add .\docs\
git commit -m "{insert change description here}"
git push
```
