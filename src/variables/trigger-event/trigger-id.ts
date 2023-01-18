import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import {Effects} from "@crowbartools/firebot-custom-scripts-types/types/effects";
import TriggersObject = Effects.TriggersObject;

const triggers: TriggersObject = {};
triggers["event"] = ["dennisontheinternet-tits:trigger-activated", "dennisontheinternet-tits:trigger-ended", "dennisontheinternet-tits:hit"]

export const TriggerIdVariable: ReplaceVariable = {
    definition: {
        handle: "throwItemId",
        description: "Returns the trigger id from a Trigger Activated/Ended event.",
        triggers: triggers,
        // @ts-ignore
        categories: ["trigger based"],
        possibleDataOutput: ["text"]
    },
    evaluator(trigger) {
        // @ts-ignore
        return trigger.metadata.eventData.triggerID;
    }
}