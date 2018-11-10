import * as fs from "fs-extra";
// @ts-ignore
import * as StringUtils from "../StringUtils"
// @ts-ignore
import { moveFolder, replaceExtension } from "../PathUtils"

export default class PhotoRawComponent {

  extensionToRemove: string;
  extensionToKeep: string;
  extensionToBackup: string;
  path: string;
  extensionAlreadyDeleted: string;

  constructor(extensionAlreadyDeleted: string, extensionToKeep: string, path: string) {
    this.extensionAlreadyDeleted = extensionAlreadyDeleted;
    this.extensionToRemove = extensionAlreadyDeleted;
    this.extensionToKeep = extensionToKeep;
    this.extensionToBackup = extensionToKeep;
    this.path = path;
  }

  /**
   *
   * @param {string} path
   * @param {string} photoExtension
   * @param {string} rawFormat
   * @param {string} outputFolder - config.folders.generated(path)}/${params.photoExtension.extName(params.photoExtension.value)
   */
  keepFiles(outputFolder: string): void {
    moveFolder(
        PhotoRawComponent.retrieveKeepings(this.path, this.extensionToKeep, this.extensionToBackup),
        this.path,
        outputFolder
    );
  }

  /**
   *
   * @param {string} path
   * @param {string} photoExtension
   * @param {string} rawFormat
   * @param {string} outputFolder
   */
  removeFiles(outputFolder: string): void {
    moveFolder(
        PhotoRawComponent.retrieveRemovables(this.path, this.extensionToRemove, this.extensionAlreadyDeleted),
        this.path,
        outputFolder
    );
  }

  /**
   *
   * @param {string} path
   * @param {string} extensionToRemove
   * @param extensionAlreadyDeleted
   * @returns {string[]}
   */
  private static retrieveRemovables(path: string, extensionToRemove: string, extensionAlreadyDeleted: string): string[] {
    return fs.readdirSync(path)
    .filter((f: string) => StringUtils.endsWithAnyCase(f, extensionToRemove))
    .filter((f: string) => !fs.existsSync(`${path}/${replaceExtension(f, extensionToRemove, extensionAlreadyDeleted)}`));
  }

  /**
   *
   * @param {string} path
   * @param {string} extensionToKeep
   * @param {string} extensionToBackup
   * @returns {string[]}
   */
  private static retrieveKeepings(path: string, extensionToKeep: string, extensionToBackup: string): string[] {
    return fs.readdirSync(path)
    .filter((f: string) => StringUtils.endsWithAnyCase(f, extensionToKeep))
    .filter(f => fs.existsSync(`${path}/${replaceExtension(f, extensionToKeep, extensionToBackup)}`))
  }
}