//we need to create a script to read the file list because the loader file is run into the browser and
//it is impossible to read the content of a folder
const fs = require('fs');
const path = require('path');
const regexSort = require("regex-sort");
const replace = require("replace");
const folder = path.resolve(__dirname, 'dist');

let result;

//get the list of files and order it
if (fs.existsSync(folder)) {
    var files = fs.readdirSync(folder).filter(function(file) {
        if (/^loader.*\.js$/.test(file)) {
            fs.renameSync(path.resolve(__dirname, 'dist', file), path.resolve(__dirname, 'dist/loader.bundle.js'));
            return false;
        }
        return /\.(js|css)$/.test(path.extname(file).toLowerCase());
    });
    
    result = regexSort(files, [
        /^inline.*\.js$/,
        /^(?!(inline|main|loader)).*\.(js|css)$/
      , /^main.*\.js$/
    ]);
}

//replace the placeholder with the string array
replace({
  regex: "DYNAMIC_SCRIPTS_LIST",
  replacement: result,
  paths: ['./dist/loader.bundle.js'],
  recursive: true,
  silent: true,
});