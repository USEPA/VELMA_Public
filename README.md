# New VELMA 2.2 Documentation

This is the develop branch for the VELMA documentation GitHub Pages website.

## Overview

- PDF documentation were converted to .pug files and placed in the /views directory
- Run the `npm run build` command to compile .html pages

### Run dev server with the following command to view .pug files in a local host using the express.js `server.js` file.

```
npm run dev
```

### To turn .pug files into html simply run the following line:

```
node ./htmlify.js
```

## Adding .html to links

Due to lack of time I was unable to configure the test and production environments like I wanted for this reorganization. One major issue is that none of the links `<a>` tags throughout the pug files end with .html which is necessary for the live static version. Here is how I go about solving this issue.

Find and Replace regex for the entire docs folder.

Open the docs folder in VSCode

Use `Ctrl+Shift+H` to open the find and replace menu for the whole working directory

Type this into the find section, make sure to use enable the `.*` (Use regular expression) option

You could also do this without opening the docs folder specifically but then you'll need to expand the search and replace options and add `docs/*` to the files to include input option.

`(<a[^>]*href=")([^"]*?)(?<!\.html)(")`

Type this into the replace

`$1$2.html$3`

Here is a quick breakdown if you're intrested:
For the Find part:

* `(<a[^>]*href=")` - Captures the start of the `<a>` tag up to and including `href="`.
* `([^"]*?)` - Captures the value of the `href` attribute (excluding the closing quote).
* `(?<!\.html)` - Negative lookbehind to ensure the captured value does **not** end with `.html`.
* `(")` - Captures the closing quote for the `href` value.

For the replace part:

* `$1` - The opening part of the tag and `href="`.
* `$2` - The original `href` value.
* `.html` - Appended to the `href` value.
* `$3` - The closing quote.

## Converting Markdown files to pug

1. Place .md file that you want to convert into the views/markdown directory
2. Run the md_to_pug.js script

Either of these commands will work to run the script

`node md_to_pug.js`

`npm run md-to-pug`

After this run the `node ./htmlify.js` script like above to convert the newly created pug files to HTML.

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

## Developer Notes

Both the .md to .pug and .pug to .html conversions can create some discrepencies between files so .pug files do need to be manually scanned at the moment.To eliminate as many known problems as possible.

For example, if a string in markdown has both the '<' and '>' symbol around it the .pug to HTML conversion will interpret this as an HTML tag but if unrecognized it will show up and a blank screen in the final rendered HTML file.

Often when converting markdown to pug it will interpret specific inline styles like 'strong' and 'em' as applying to the remainder of the string instead of the specific word we are applying it to. In this case hard coding the html `<strong>...</strong>` or `<em>...</em>` in the .pug file will fix the issue.

## Adding new data

To create a new page for the public docs site all you need to do is create a new .pug file in the correct version and section that the doc describes. For example if we wanted to add a new calibration file for version 2.2 we could create New_Calibration_File.pug inside the `views/version/2.2/calibration` folder. Then we need to open that file and copy the 'template' from another calibration file so that the header, and navbars are created as well.

Here is the 'template' I am referring to for this example

```
extends ../../../layout.pug
block content
    div.main-body
        include calibration_partials/_calibration_side_nav.pug 
        div.flex-body-content
```

The extends layout.pug line gets the layout.pug file from the 'views' directory for the over HTML structure and header sections.

Then we create the content block that places this page within the overall layout.pug file.

Next we create the main body div

We include the calibration side nave and create the body content div. Inside this div is where all the new content will go.

Make sure to alter the `_calibration_side_nav.pug` to include a link to this new page like this

```
a(href="/docs/version/2.2/calibration/New_Calibration_File")
            span New Calibration File Title
```

Once we are ready to expose this file we want to run the `node htmlify.js` file again. We want to compile all files at least in this section so that the side nav is updated for all files in the section.

`htmlify_files.js` let's us specify certain .pug files to compile instead of doing all of them again. We could write out all the files in the 2.2/calibration section and use this but often it is easier to just recompile everything.

### These steps can also be followed after converting markdown content to pug.

After converting the markdown content to pug simply past it in the div.flex-body-content section described above
