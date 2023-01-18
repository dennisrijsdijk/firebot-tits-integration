import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import {Effects} from "@crowbartools/firebot-custom-scripts-types/types/effects";
import TriggersObject = Effects.TriggersObject;
import {getTriggers} from "../../tits-connector";

const triggers: TriggersObject = {};
triggers["event"] = ["dennisontheinternet-tits:trigger-activated", "dennisontheinternet-tits:trigger-ended", "dennisontheinternet-tits:hit"]

export const TriggerNameVariable: ReplaceVariable = {
    definition: {
        handle: "throwItemId",
        description: "Returns the trigger name from a Trigger Activated/Ended event.",
        triggers: triggers,
        // @ts-ignore
        categories: ["trigger based"],
        possibleDataOutput: ["text"]
    },
    evaluator: async (trigger) => {
        if (trigger.metadata.event.id === "dennisontheinternet-tits:hit") {
            return trigger.metadata.eventData.triggerName;
        }

        const triggers = await getTriggers();

        triggers.forEach(titsTrigger => {
            if (titsTrigger.ID === trigger.metadata.eventData.triggerID) {
                return titsTrigger.name;
            }
        });
        return "Unknown";
    }
}