//<reference path=typings.d.ts>
import PhotoRawComponent from "./components/PhotoRawComponent";
import {commander} from "./Configuration";
import {EnvironmentHandler} from "./handler/EnvironmentHandler";
import {ICommand} from "./interfaces/Configuration";

commander.parse(process.argv);

// @ts-ignore
global.__DEBUG_LEVEL_DEEPEST = 1;
// @ts-ignore
global.__DEBUG_LEVEL_MIN = 0;
// @ts-ignore
global.__debugLevel = commander.debug.value;

EnvironmentHandler.checkMandatoryOptions(<ICommand>commander);
EnvironmentHandler.checkEnvironment(commander.destination.value);
EnvironmentHandler.prepareEnvironment(commander.folder);

const photoRawComponent = new PhotoRawComponent(
    commander.extension.value,
    commander.raw.value,
    commander.destination.value
);

photoRawComponent.displayParameters();

photoRawComponent.removeFiles(commander.folder.removal);

photoRawComponent.keepFiles(
    commander.folder.keeping(
        commander.extension.extName
    )
);
