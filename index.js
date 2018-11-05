const fs = require('fs-extra');
var ncp = require('ncp').ncp;

const DEBUG_LEVEL_DEEPEST = 1;
const DEBUG_LEVEL_MIN = 0;

const config = {
    folders: {
        generated: p => `${p}/generated`,
        removal: p => `${p}/generated/to_remove`
    }
};

const params = {
    destination: { position: 1, name: "target", defaultValue: "./images", format: formatPath },
    photoExtension: { position: 2, name: "extension", defaultValue: "jpg", format: formatExtension, extName: extractExtensionName },
    rawFormat: { position: 3, name: "raw", defaultValue: "nef", format: formatExtension, extName: extractExtensionName },
    debug: { position: 4, name: "debug", defaultValue: 0 }
};

params.destination.value = params.destination.format(extractParameter(process.argv, params.destination));
params.photoExtension.value = params.photoExtension.format(extractParameter(process.argv, params.photoExtension));
params.rawFormat.value = params.rawFormat.format(extractParameter(process.argv, params.rawFormat));
params.debug.value = extractParameter(process.argv, params.debug);

console.log(`Debug level selected is : ${params.debug.value}`);

logDeepest("Parameters:", params);

if (!fs.existsSync(__dirname)) {
    console.error(`folder ${__dirname} doesn't exist`);
    process.exit(1);
}

let path = params.destination.value;

if (!fs.existsSync(path)) {
    logMinimum(`Unable to find directory : ${path}`);
    process.exit(1);
}

logMinimum(`main ==> Folder to analyse : ${path}`);

createDirIfNot(config.folders.generated(path));
createDirIfNot(config.folders.generated(path) + "/" + params.photoExtension.extName(params.photoExtension.value));
createDirIfNot(config.folders.removal(path));

fs.readdirSync(path)
    .filter(f => f.endsWith(params.photoExtension.value))
    .filter(f => !fs.existsSync(`${path}/${replaceExtension(f, params.photoExtension.value, params.rawFormat.value)}`))
    .forEach(f => {
        logMinimum(`main ==> moving file ${f} to removing folder : ${config.folders.removal(path)}`);
        fs.moveSync(`${path}/${f}`, `${config.folders.removal(path)}/${f}`);
});

fs.readdirSync(path)
    .filter(f => f.endsWith(params.photoExtension.value))
    .filter(f => fs.existsSync(`${path}/${replaceExtension(f, params.photoExtension.value, params.rawFormat.value)}`))
    .forEach(f => {
        logMinimum(`main ==> Check if file already exists in the following folder`);
        logMinimum(`main ==> moving file ${f} to keeping folder : ${config.folders.generated(path)}/${params.photoExtension.extName(params.photoExtension.value)}`);
        fs.moveSync(`${path}/${f}`, `${config.folders.generated(path)}/${params.photoExtension.extName(params.photoExtension.value)}/${f}`);
});

function replaceExtension(filename, extension, newExtension) {

    if (!filename) {
        console.error("Please provide filename in removeExtension parameters");
        process.exit(1);
    }

    if (!extension) {
        console.error("Please provide extension in removeExtension parameters");
        process.exit(1);
    }

    if (!newExtension) {
        console.error("Please provide newExtension in removeExtension parameters");
        process.exit(1);
    }

    const filenameWithoutExtension = filename.substr(0, filename.length - (extension.length)).concat(newExtension);

    if (params.debug.value === DEBUG_LEVEL_DEEPEST) {
        console.debug(`removeExtension ==> ${filename}, ${extension}, ${newExtension} : ${filenameWithoutExtension}`);
    }

    return filenameWithoutExtension;
}

function createDirIfNot(path) {

    if (path.startsWith(".")) { path = path.substr(1); }

    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
        logDeepest(`CreateDirIfNot ==> Folder created : ${path}`);
        return;
    }

    logDeepest(`CreateDirIfNot ==> Folder already exists, unable to create directory : ${path}`);
}

function logDeepest(message, args = "") {
    if (params.debug.value >= DEBUG_LEVEL_DEEPEST) {
        console.log(message, args);
    }
}

function logMinimum(message, args = "") {
    if (params.debug.value >= DEBUG_LEVEL_MIN) {
        console.log(message, args);
    }
}

function formatPath(path) {
    if (path.startsWith('./')) {
        path = path.substring(2);
    }
    if (path.endsWith('/')) {
        path = path.substring(0, path.length - 1);
    }
    if (!path.startsWith('/')) {
        path = `${__dirname}/${path}`;
    }
    return path;
}

function extractExtensionName(ext) {
    return ext.startsWith(".") ? ext.substr(1) : ext;
}

function formatExtension(ext) {
    return !ext.startsWith(".") ? `.${ext}` : ext
}

function extractParameter(args, param) {
    const returnValue = args[param.position + 1]
    && args[param.position + 1].startsWith(`--${param.name}`)
    && args[param.position + 1].split("=").length === 2
    && args[param.position + 1].split("=")[1]
        ? args[param.position + 1].split("=")[1] : param.defaultValue;
    if (!returnValue) { console.error(`Unable to find in position ${param.position}, the parameter : ${param.name}`
        + `\n instead, you have the parameter : ${args[param.position + 1]}`); process.exit(1); }
    return returnValue;
}
