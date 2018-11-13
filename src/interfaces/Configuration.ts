import {Command} from "commander";

export interface ICommand extends Command {
  destination?: ICommandOption,
  extension?: ICommandOption,
  raw?: ICommandOption,
  folder?: IFolderConfiguration,
  debugLevel?: ICommandOption
}

export interface ICommandOption {
  position: number,
  name: string,
  value: string,
  format?: (ext) => string,
  extName?: string
}

export interface IFolderConfiguration {
  generated: string,
  removal: string
  keeping: (ext: string) => string
}