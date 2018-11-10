//<reference path=typings.d.ts>
import * as fs from "fs-extra";
import {extractParameter} from "Options";
import {formatPath, extractExtensionName, formatExtension, createDirIfNot} from './PathUtils';
import PhotoRawComponent from "./components/PhotoRawComponent";

import * as Logger from './LogUtils';
// @ts-ignore
global.__DEBUG_LEVEL_DEEPEST = 1;
// @ts-ignore
global.__DEBUG_LEVEL_MIN = 0;

const config: Configuration = {
    folders: {
        generated: p => `${p}/generated`,
        removal: p => `${p}/generated/to_remove`,
        extension: (p,ext) => `${p}/generated/${ext}`
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

// @ts-ignore
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

const photoRawComponent = new PhotoRawComponent(
    params.photoExtension.value,
    params.rawFormat.value,
    path
);

photoRawComponent.removeFiles(config.folders.removal(path));
photoRawComponent.keepFiles(`${config.folders.extension(path, params.photoExtension.extName(params.photoExtension.value))}`);