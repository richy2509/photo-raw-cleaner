import * as fs from "fs";
import * as Logger from "LogUtils";

/**
 *
 * @param {string} path
 * @returns {string}
 */
function formatPath(path: string): string {
    if (path.startsWith('./')) {
        path = path.substring(2);
    }
    if (path.endsWith('/')) {
        path = path.substring(0, path.length - 1);
    }
    return path;
}

/**
 *
 * @param {string} ext
 * @returns {string}
 */
function extractExtensionName(ext: string): string {
    return ext.startsWith(".") ? ext.substr(1) : ext;
}

/**
 *
 * @param {string} ext
 * @returns {string}
 */
function formatExtension(ext: string): string {
    return !ext.startsWith(".") ? `.${ext.toUpperCase()}` : ext.toUpperCase()
}

/**
 *
 * @param {string} path
 */
function createDirIfNot(path: string) {

    if (path.startsWith(".")) { path = path.substr(1); }

    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
        Logger.logDeepest(`CreateDirIfNot ==> Folder created : ${path}`);
        return;
    }

    Logger.logDeepest(`CreateDirIfNot ==> Folder already exists, unable to create directory : ${path}`);
}

/**
 *
 * @param filename
 * @param extension
 * @param newExtension
 * @returns {string}
 */
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

    Logger.logDeepest(`removeExtension ==> ${filename}, ${extension}, ${newExtension} : ${filenameWithoutExtension}`);

    return filenameWithoutExtension;
}

module.exports = {
    formatPath,
    extractExtensionName,
    formatExtension,
    replaceExtension,
    createDirIfNot
};