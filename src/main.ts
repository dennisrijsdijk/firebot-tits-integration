import {Firebot, ScriptModules} from "@crowbartools/firebot-custom-scripts-types";
import {TITSEventSource} from "./events";
import {disconnectSockets, initializeSockets} from "./tits-connector";
import {ZDirectionVariable} from "./variables/throw-event/z";
import {XDirectionVariable} from "./variables/throw-event/x";
import {YDirectionVariable} from "./variables/throw-event/y";
import {ItemIdVariable} from "./variables/throw-event/item-id";
import {ItemNameVariable} from "./variables/throw-event/item-name";
import {StrengthVariable} from "./variables/throw-event/strength";
import {ThrowEffectType} from "./effects/throw-items-effect";
import {setupFrontendListeners} from "./communicator";

interface Params {
  baseEndpoint: string;
}

const script: Firebot.CustomScript<Params> = {
  getScriptManifest: () => {
    return {
      name: "T.I.T.S Integration",
      description: "Twitch Integrated Throwing System for Firebot",
      author: "DennisOnTheInternet",
      version: "1.0",
      firebotVersion: "5",
    };
  },
  getDefaultParameters: () => {
    return {
      baseEndpoint: {
        type: "string",
        default: "ws://127.0.0.1:42069",
        description: "T.I.T.S Websocket Address",
        secondaryDescription: "The Websocket connection address for T.I.T.S. Defaults to ws://127.0.0.1:42069",
      },
    };
  },
  run: (runRequest) => {
    baseEndpoint = runRequest.parameters.baseEndpoint;
    modules = runRequest.modules;
    modules.eventManager.registerEventSource(TITSEventSource);
    modules.replaceVariableManager.registerReplaceVariable(ItemIdVariable);
    modules.replaceVariableManager.registerReplaceVariable(ItemNameVariable);
    modules.replaceVariableManager.registerReplaceVariable(StrengthVariable);
    modules.replaceVariableManager.registerReplaceVariable(XDirectionVariable);
    modules.replaceVariableManager.registerReplaceVariable(YDirectionVariable);
    modules.replaceVariableManager.registerReplaceVariable(ZDirectionVariable);
    setupFrontendListeners()
    modules.effectManager.registerEffect(ThrowEffectType);
    initializeSockets();
  },
  parametersUpdated(parameters: Params) {
    disconnectSockets();
    baseEndpoint = parameters.baseEndpoint;
    initializeSockets();
  },
  stop() {
    disconnectSockets();
  },
};

export let modules: ScriptModules;
export let baseEndpoint: string;

export default script;
