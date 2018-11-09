import {fs} from "fs-extra";
import { rimraf } from "rimraf";

class Initializor {

    static init() {
        fs.removeSync('./images');
        fs.copySync('./images_templates', './images');
    }

}

export { Initializor };
