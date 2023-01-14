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
                sceneName: "Test Scene Name",
            },
        },
        {
            id: "trigger-activated",
            name: "T.I.T.S Trigger Activated",
            description: "When a trigger is activated in T.I.T.S",
            manualMetadata: {},
        },
        {
            id: "trigger-ended",
            name: "T.I.T.S Trigger Ended",
            description: "When a trigger has ended in T.I.T.S",
            manualMetadata: {},
        },
    ],
};