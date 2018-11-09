import * as fs from "fs-extra";

export default class Initializor {

    static init() {
        fs.removeSync('./dist/images');
        fs.copySync('./templates/images', './dist/images');
    }

}

Initializor.init();