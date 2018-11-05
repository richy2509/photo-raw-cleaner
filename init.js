const ncp = require('ncp').ncp;
var fs = require('fs-extra');
const rimraf = require('rimraf');

fs.removeSync('./images');
fs.copySync('./images_templates', './images');