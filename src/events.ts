import { EventSource } from "@crowbartools/firebot-custom-scripts-types/types/modules/event-manager";

export const TITSEventSource: EventSource = {
    id: "dennisontheinternet-tits",
    name: "TITS",
    events: [
        {
            id: "hit",
            name: "T.I.T.S Hit",
            description: "When an object hits you in T.I.T.S",
            manualMetadata: {
                itemID: "00000000-0000-0000-0000-000000000000",
                itemName: "testItem",
                triggerID: "00000000-0000-0000-0000-000000000000",
                triggerName: "testTrigger",
                strength: 24.8588161,
                x: 0.1441319,
                y: 0.967980564,
                z: 0.2055228,
            },
        },
        {
            id: "trigger-activated",
            name: "T.I.T.S Trigger Activated",
            description: "When a trigger is activated in T.I.T.S",
            manualMetadata: {
                triggerID: "00000000-0000-0000-0000-000000000000"
            },
        },
        {
            id: "trigger-ended",
            name: "T.I.T.S Trigger Ended",
            description: "When a trigger has ended in T.I.T.S",
            manualMetadata: {
                triggerID: "00000000-0000-0000-0000-000000000000"
            },
        },
    ],
};