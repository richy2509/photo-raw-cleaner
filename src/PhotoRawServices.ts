import {Logger} from "LogUtils";
import * as fs from "fs-extra";
import {endsWithAnyCase} from "StringUtils"
import {replaceExtension} from "PathUtils"

export default class PhotoRawServices {

    cleanRaws(path: string, config: Configuration, params: Parameter) {
        Logger.logMinimum(`main ==> begin reading ${path}`);
        fs.readdirSync(path)
            .filter((f: string) => endsWithAnyCase(f, params.photoExtension.value))
            .filter((f: string) => !fs.existsSync(`${path}/${replaceExtension(f, params.photoExtension.value, params.rawFormat.value)}`))
            .forEach( (f: string) => {
                Logger.logMinimum(`main ==> moving file ${f} to removing folder : ${config.folders.removal(path)}`);
                fs.moveSync(`${path}/${f}`, `${config.folders.removal(path)}/${f}`);
            });
        Logger.logMinimum(`main ==> end reading ${path}`);

    }

}