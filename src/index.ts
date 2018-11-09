///<reference path="Options.ts"/>
import * as fs from "fs-extra";
import {extractParameter} from "Options";
import * as Logger from 'LogUtils';
import {formatPath, extractExtensionName, formatExtension, replaceExtension, createDirIfNot} from 'PathUtils';
import { endsWithAnyCase } from 'StringUtils';

global.__DEBUG_LEVEL_DEEPEST = 1;
global.__DEBUG_LEVEL_MIN = 0;

const config: Configuration = {
    folders: {
        generated: p => `${p}/generated`,
        removal: p => `${p}/generated/to_remove`
    }
};

const params: Parameter = {
    destination: { position: 1, name: "target", defaultValue: "./dist/images", format: formatPath },
    photoExtension: { position: 2, name: "extension", defaultValue: "jpg", format: formatExtension, extName: extractExtensionName },
    rawFormat: { position: 3, name: "raw", defaultValue: "nef", format: formatExtension, extName: extractExtensionName },
    debug: { position: 4, name: "debug", defaultValue: 2 }
};

params.destination.value = params.destination.format(extractParameter(process.argv, params.destination));
params.photoExtension.value = params.photoExtension.format(extractParameter(process.argv, params.photoExtension));
params.rawFormat.value = params.rawFormat.format(extractParameter(process.argv, params.rawFormat));
params.debug.value = extractParameter(process.argv, params.debug);

global.__debugLevel = params.debug.value;

let path: string = params.destination.value;

//Logger.logDeepest("Parameters:", params);
console.log(`Debug level selected is : ${params.debug.value}`);


if (!fs.existsSync(path)) {
    Logger.logMinimum(`Unable to find directory : ${path}`);
    process.exit(1);
} else {
    Logger.logDeepest(`main ==> The folder ${path} exists`)
}

Logger.logMinimum(`main ==> Folder to analyse : ${path}`);

createDirIfNot(config.folders.generated(path));
createDirIfNot(config.folders.generated(path) + "/" + params.photoExtension.extName(params.photoExtension.value));
createDirIfNot(config.folders.removal(path));


//Logger.logMinimumCallback(fs.readdirSync(path).forEach(p => {
//    console.log(`main [ ${path} ] ==> ${p}`);
//}));

Logger.logMinimum(`main ==> begin reading ${path}`);
fs.readdirSync(path)
    .filter((f: string) => endsWithAnyCase(f, params.photoExtension.value))
    .filter((f: string) => !fs.existsSync(`${path}/${replaceExtension(f, params.photoExtension.value, params.rawFormat.value)}`))
    .forEach( (f: string) => {
        Logger.logMinimum(`main ==> moving file ${f} to removing folder : ${config.folders.removal(path)}`);
        fs.moveSync(`${path}/${f}`, `${config.folders.removal(path)}/${f}`);
});
Logger.logMinimum(`main ==> end reading ${path}`);

Logger.logMinimum(`main ==> begin reading ${path}`);
fs.readdirSync(path)
    .filter((f: string) => endsWithAnyCase(f, params.photoExtension.value))
    .filter(f => fs.existsSync(`${path}/${replaceExtension(f, params.photoExtension.value, params.rawFormat.value)}`))
    .forEach(f => {
        Logger.logMinimum(`main ==> Check if file already exists in the following folder`);
        Logger.logMinimum(`main ==> moving file ${f} to keeping folder : ${config.folders.generated(path)}/${params.photoExtension.extName(params.photoExtension.value)}`);
        fs.moveSync(`${path}/${f}`, `${config.folders.generated(path)}/${params.photoExtension.extName(params.photoExtension.value)}/${f}`);
});
Logger.logMinimum(`main ==> end reading ${path}`);
