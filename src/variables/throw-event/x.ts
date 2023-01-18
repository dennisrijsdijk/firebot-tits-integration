import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import {Effects} from "@crowbartools/firebot-custom-scripts-types/types/effects";
import TriggersObject = Effects.TriggersObject;

const triggers: TriggersObject = {};
triggers["event"] = ["dennisontheinternet-tits:hit"]

export const XDirectionVariable: ReplaceVariable = {
    definition: {
        handle: "throwDirectionX",
        description: "Returns the X direction of the T.I.T.S throw event.",
        triggers: triggers,
        // @ts-ignore
        categories: ["trigger based"],
        possibleDataOutput: ["number"]
    },
    evaluator(trigger) {
        return trigger.metadata.eventData.x;
    }
}