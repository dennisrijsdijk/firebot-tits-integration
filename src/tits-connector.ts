import {RawData, WebSocket} from 'ws';
import {baseEndpoint, modules} from "./main";
import { v4 as uuidv4 } from 'uuid';

const reconnectInterval = 10 * 1000; // 10 seconds

let commandWebSocket: WebSocket;
let eventWebSocket: WebSocket;

const connectCommand = () => {
    commandWebSocket = new WebSocket(baseEndpoint + '/websocket');

    commandWebSocket.on('open', function() {
        modules.logger.info("Connected to T.I.T.S Command socket.");
    });

    commandWebSocket.on('error', function(error: Error) {
        modules.logger.error("Error from Command socket: ", error);
    });

    commandWebSocket.on('close', function(code: number, reason: Buffer) {
        if (code === 3000) {
            return;
        }
        modules.logger.info(`T.I.T.S Command socket disconnected. Reconnecting in ${reconnectInterval/1000} seconds`);
        setTimeout(connectCommand, reconnectInterval);
    });
}

const connectEvent = () => {
    eventWebSocket = new WebSocket(baseEndpoint + '/events');

    eventWebSocket.on('open', function() {
        modules.logger.info("Connected to T.I.T.S Events socket.");
    });

    eventWebSocket.on('error', function(error: Error) {
        modules.logger.error("Error from Event socket: ", error);
    });

    eventWebSocket.on('close', function(code: number, reason: Buffer) {
        if (code === 3000) {
            return;
        }
        modules.logger.info(`T.I.T.S Event socket disconnected. Reconnecting in ${reconnectInterval/1000} seconds`);
        setTimeout(connectEvent, reconnectInterval);
    });

    eventWebSocket.on("message", function (data: RawData) {
        let eventData = JSON.parse(data.toString());
        //modules.logger.info("T.I.T.S Event received: ", eventData);
        if (eventData.messageType === "TITSHitEvent") {
            modules.eventManager.triggerEvent("dennisontheinternet-tits", "hit", {
                itemID: eventData.data.itemID,
                itemName: eventData.data.itemName,
                triggerID: eventData.data.triggerID,
                triggerName: eventData.data.triggerName,
                strength: eventData.data.strength,
                x: eventData.data.direction.x,
                y: eventData.data.direction.y,
                z: eventData.data.direction.z,
            });
        }
        else if (eventData.messageType === "TITSTriggerActivatedEvent") {
            modules.eventManager.triggerEvent("dennisontheinternet-tits", "trigger-activated", {
                triggerID: eventData.data.triggerID
            });
        }
        else if (eventData.messageType === "TITSTriggerActivatedEvent") {
            modules.eventManager.triggerEvent("dennisontheinternet-tits", "trigger-ended", {
                triggerID: eventData.data.triggerID
            });
        }
    });
}

export const initializeSockets = () => {
    connectCommand();
    connectEvent();
}

export const disconnectSockets = () => {
    eventWebSocket.close(3000, "Disconnect");
    commandWebSocket.close(3000, "Disconnect");
}

export const getItemList = (sendImage = false) => {
    return new Promise<{ID: string, name: string, encodedImage: string}[]>((resolve) => {
        const requestID = uuidv4();
        const listener = (data: RawData) => {
            let responseData = JSON.parse(data.toString());
            if (responseData.requestID !== requestID) {
                return;
            }
            commandWebSocket.off("message", listener);
            resolve(responseData.data.items);
        };
        commandWebSocket.on("message", listener);
        commandWebSocket.send(JSON.stringify({
            apiName: "TITSPublicApi",
            apiVersion: "1.0",
            requestID: requestID,
            messageType: "TITSItemListRequest",
            sendImage: sendImage
        }));
    });
}

export const getItem = (itemID: string) => {
    return new Promise<{ID: string, name: string, encodedImage: string}>((resolve) => {
        const requestID = uuidv4();
        const listener = (data: RawData) => {
            let responseData = JSON.parse(data.toString());
            if (responseData.requestID !== requestID) {
                return;
            }
            commandWebSocket.off("message", listener);
            resolve(responseData.data);
        };
        commandWebSocket.on("message", listener);
        commandWebSocket.send(JSON.stringify({
            apiName: "TITSPublicApi",
            apiVersion: "1.0",
            requestID: requestID,
            messageType: "TITSItemInfoRequest",
            data: {
                itemID: itemID
            }
        }));
    });
}

export const throwItems = (items: string[], delayTime: number, amountOfThrows: number) => {
    return new Promise<void>((resolve) => {
        const requestID = uuidv4();
        const listener = (data: RawData) => {
            let responseData = JSON.parse(data.toString());
            if (responseData.requestID !== requestID) {
                return;
            }
            commandWebSocket.off("message", listener);
            resolve();
        };
        commandWebSocket.on("message", listener);
        commandWebSocket.send(JSON.stringify({
            apiName: "TITSPublicApi",
            apiVersion: "1.0",
            requestID: requestID,
            messageType: "TITSThrowItemsRequest",
            data: {
                items: items,
                delayTime: delayTime,
                amountOfThrows: amountOfThrows,
                errorOnMissingID: false
            }
        }));
    });
}

export const getTriggers = () => {
    return new Promise<{ID: string, name: string}[]>((resolve) => {
        const requestID = uuidv4();
        const listener = (data: RawData) => {
            let responseData = JSON.parse(data.toString());
            if (responseData.requestID !== requestID) {
                return;
            }
            commandWebSocket.off("message", listener);
            resolve(responseData.data.triggers);
        };
        commandWebSocket.on("message", listener);
        commandWebSocket.send(JSON.stringify({
            apiName: "TITSPublicApi",
            apiVersion: "1.0",
            requestID: requestID,
            messageType: "TITSTriggerListRequest",
        }));
    });
}

export const activateTrigger = (triggerID: string) => {
    return new Promise<void>((resolve) => {
        const requestID = uuidv4();
        const listener = (data: RawData) => {
            let responseData = JSON.parse(data.toString());
            if (responseData.requestID !== requestID) {
                return;
            }
            commandWebSocket.off("message", listener);
            resolve();
        };
        commandWebSocket.on("message", listener);
        commandWebSocket.send(JSON.stringify({
            apiName: "TITSPublicApi",
            apiVersion: "1.0",
            requestID: requestID,
            messageType: "TITSTriggerActivateRequest",
            data: {
                triggerID: triggerID
            }
        }));
    });
}