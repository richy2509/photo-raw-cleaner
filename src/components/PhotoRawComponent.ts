import * as fs from "fs-extra";
import * as StringUtils from "../StringUtils"
import { moveFolder, replaceExtension } from "../PathUtils"

export default class PhotoRawComponent {

  extensionToRemove: string;
  extensionToKeep: string;
  extensionToBackup: string;
  output: string;
  extensionAlreadyDeleted: string;

  constructor(classicExtension: string, rawExtension: string, output: string) {

    this.extensionAlreadyDeleted = classicExtension;
    this.extensionToRemove = rawExtension;

    this.extensionToKeep = rawExtension;
    this.extensionToBackup = classicExtension;

    this.output = output;
  }

  /**
   *
   * @param {string} output
   * @param {string} photoExtension
   * @param {string} rawFormat
   * @param {string} outputFolder - config.folders.generated(output)}/${params.photoExtension.extName(params.photoExtension.value)
   */
  keepFiles(outputFolder: string): void {
    moveFolder(
        PhotoRawComponent.retrieveKeepings(this.output, this.extensionToKeep, this.extensionToBackup),
        this.output,
        outputFolder
    );
  }

  /**
   *
   * @param {string} output
   * @param {string} photoExtension
   * @param {string} rawFormat
   * @param {string} outputFolder
   */
  removeFiles(outputFolder: string): void {
    moveFolder(
        PhotoRawComponent.retrieveRemovables(this.output, this.extensionToRemove, this.extensionAlreadyDeleted),
        this.output,
        outputFolder
    );
  }

  displayParameters(){
    console.log(`extensionAlreadyDeleted : ${this.extensionAlreadyDeleted}`);
    console.log(`extensionToRemove : ${this.extensionToRemove}`);
    console.log(`extensionToKeep : ${this.extensionToKeep}`);
    console.log(`extensionToBackup : ${this.extensionToBackup}`);
    console.log(`output : ${this.output}`);
  }

  /**
   *
   * @param {string} output
   * @param {string} extensionToRemove
   * @param extensionAlreadyDeleted
   * @returns {string[]}
   */
  private static retrieveRemovables(output: string, extensionToRemove: string, extensionAlreadyDeleted: string): string[] {
    return fs.readdirSync(output)
    .filter((f: string) => StringUtils.endsWithAnyCase(f, extensionToRemove))
    .filter((f: string) => !fs.existsSync(`${output}/${replaceExtension(f, extensionToRemove, extensionAlreadyDeleted)}`));
  }

  /**
   *
   * @param {string} output
   * @param {string} extensionToKeep
   * @param {string} extensionToBackup
   * @returns {string[]}
   */
  private static retrieveKeepings(output: string, extensionToKeep: string, extensionToBackup: string): string[] {
    return fs.readdirSync(output)
    .filter((f: string) => StringUtils.endsWithAnyCase(f, extensionToKeep))
    .map(f => {
      return replaceExtension(f, extensionToKeep, extensionToBackup);
    })
    .filter(f => fs.existsSync(`${output}/${f}`))
  }
}