var fs = require("fs");

if (fs.exists(__dirname)) {
    console.log("file exists");
    process.exit(1);
}
console.error(`folder ${__dirname} doesn't exist`);
process.exit(0);