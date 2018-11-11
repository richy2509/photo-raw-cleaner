import {Command} from "commander";

export interface ICommand extends Command {
  destination: ICommandOption,
  extension: ICommandOption,
  raw: ICommandOption,
  folder: ICommandOption,
  debugLevel: ICommandOption
}

export interface ICommandOption {
  position: number,
  name: string,
  value: string,
  format?: (ext) => string,
  extName?: (ext) => string
}

export interface FolderConfiguration {
  generated: string,
  removal: string
  extension: (ext: string) => string
}