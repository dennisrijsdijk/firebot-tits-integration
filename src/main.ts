import {Firebot, ScriptModules} from "@crowbartools/firebot-custom-scripts-types";

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
  },
};

export let modules: ScriptModules;
export let baseEndpoint: string;

export default script;
