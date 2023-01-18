import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import {Effects} from "@crowbartools/firebot-custom-scripts-types/types/effects";
import TriggersObject = Effects.TriggersObject;

const triggers: TriggersObject = {};
triggers["event"] = ["dennisontheinternet-tits:hit"]

export const ItemNameVariable: ReplaceVariable = {
    definition: {
        handle: "throwItemName",
        description: "Returns the item name of the T.I.T.S throw event.",
        triggers: triggers,
        // @ts-ignore
        categories: ["trigger based"],
        possibleDataOutput: ["text"]
    },
    evaluator(trigger) {
        return trigger.metadata.eventData.itemName;
    }
}