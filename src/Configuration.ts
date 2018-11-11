import {extractExtensionName, formatExtension, formatPath} from "./PathUtils";
import * as program from 'commander';
import {Command} from 'commander';

const REGEX_RAW_FORMAT = /^(\.3fr|\.ari|\.arw|\.bay|\.crw|\.cr2|\.cr3|\.cap|\.data|\.dcs|\.dcr|\.dng|\.drf|\.eip|\.erf|\.fff|\.gpr|\.iiq|\.k25|\.kdc|\.mdc|\.mef|\.mos|\.mrw|\.nef|\.nrw|\.obm|\.orf|\.pef|\.ptx|\.pxn|\.r3d|\.raf|\.raw|\.rwl|\.rw2|\.rwz|\.sr2|\.srf|\.srw|\.tif|\.x3f)$/i;
const REGEX_EXTENSION_FORMAT = /^\.\w{2,4}$/i;

export const commander: Command = program
.version('0.1.0')
.option('-d, --destination <dest>', 'The destination folder', (dest) => {
  return {
    position: 1,
    name: "target",
    format: formatPath,
    value: dest ? dest : './dist/images'
  };
})
.option('-e, --extension <ext>', 'Default extension', (ext: string) => {
  if (ext.match(REGEX_EXTENSION_FORMAT)) {
    return {
      position: 2,
      name: "extension",
      value: formatExtension(ext ? ext : '.JPG'),
      extName: extractExtensionName(ext)
    }
  }
})
.option('-r, --raw <raw>', 'Define your raw format', (ext) => {
  if (ext.match(REGEX_RAW_FORMAT)) {
    return {
      position: 3,
      name: "raw",
      value: ext ? ext : '.NEF',
      format: formatExtension(ext),
      extName: extractExtensionName(ext)
    }
  }
})
.option('-d, --debug <debugLevel>', 'Add the level debug mode', (debugLevel: string) => {
  if (debugLevel.match(/^\d$/i)) {
    return {
      position: 4,
      name: "debug",
      value: debugLevel ? debugLevel : 1
    }
  }
}, {
  position: 4,
  name: "debug",
  value: 1
})
.option('-f, --folder <folder>', "Precise folder destination to put images", (folder) => {
  return {
    generated: folder,
    removal: `${folder}/to_remove`,
    extension: (ext) => `${folder}/${ext}`
  }
}, {
  generated: "./dist/images/generated",
  removal: "./dist/images/generated/to_remove",
  extension: (ext) => `./dist/images/generated/${ext}`
});