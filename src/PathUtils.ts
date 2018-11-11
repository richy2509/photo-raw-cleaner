import * as fs from "fs-extra";
import * as Logger from "./LogUtils";

/**
 *
 * @param {string} path
 * @returns {string}
 */
export function formatPath(path: string): string {
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
export function extractExtensionName(ext: string): string {
  return ext.startsWith(".") ? ext.substr(1) : ext;
}

/**
 *
 * @param {string} ext
 * @returns {string}
 */
export function formatExtension(ext: string): string {
  return !ext.startsWith(".") ? `.${ext.toUpperCase()}` : ext.toUpperCase()
}

/**
 *
 * @param path
 */
export function createDirIfNot(...path: string[]) {
  path.forEach(p => {
    createDir(p);
  });
}

/**
 *
 * @param {string} path
 */
function createDir(path: string) {

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
    Logger.logDeepest(`CreateDirIfNot ==> Folder created : ${path}`);
    return;
  }

  Logger.logDeepest(`CreateDirIfNot ==> Folder already exists, unable to create directory : ${path}`);
}


/**
 *
 * @param {string[]} files
 * @param {string} path
 * @param {string} outputFolder
 */
export function moveFolder(files: string[], path: string, outputFolder: string): void {
  Logger.logMinimum(`List of files to move ${files}`);
  files
  .forEach((f: string) => {
    Logger.logMinimum(`main ==> Check if file already exists in the following folder`);
    //TODO
    Logger.logMinimum(`main ==> moving file ${f} to folder : ${outputFolder}`);
    fs.moveSync(`${path}/${f}`, `${outputFolder}/${f}`);
  });
}

/**
 *
 * @param filename
 * @param extension
 * @param newExtension
 * @returns {string}
 */
export function replaceExtension(filename, extension, newExtension) {

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

  Logger.logDeepest(`replaceExtension ==> ${filename}, ${extension}, ${newExtension} : ${filenameWithoutExtension}`);

  return filenameWithoutExtension;
}