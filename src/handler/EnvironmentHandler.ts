import * as Logger from "../LogUtils";
import * as fs from "fs";
import {commander} from "../Configuration";
import {createDirIfNot} from "../PathUtils";
import {IFolderConfiguration, ICommand} from "../interfaces/Configuration";
import {logError} from "../LogUtils";

export class EnvironmentHandler {

  static checkMandatoryOptions(commander: ICommand): void {

    if (!commander.destination) {
      logError("Parameter --destination is mandatory");
      process.exit(1);
    }
    if (!commander.extension) {
      logError("Parameter --extension is mandatory");
      process.exit(1);
    }
    if (!commander.raw) {
      logError("Parameter --raw is mandatory");
      process.exit(1);
    }

  }

  static prepareEnvironment(folder: IFolderConfiguration) {
    createDirIfNot(
        folder.generated,
        folder.removal,
        folder.extension(commander.extension.extName)
    );
  }

  static checkEnvironment(path: string) {
    if (!fs.existsSync(path)) {
      Logger.logMinimum(`Unable to find directory : ${path}`);
      process.exit(1);
    } else {
      Logger.logDeepest(`main ==> The folder ${path} exists`)
    }
    Logger.logMinimum(`main ==> Folder to analyse : ${path}`);
  }

}