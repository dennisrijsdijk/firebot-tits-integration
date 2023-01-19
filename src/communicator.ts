import {modules} from "./main";
import {getItemList, getItem, getTriggers} from "./tits-connector";


export const setupFrontendListeners = () => {
    modules.frontendCommunicator.onAsync("tits-get-items", () => getItemList());
    modules.frontendCommunicator.onAsync("tits-get-items-with-images", () => getItemList(true));
    // @ts-ignore
    modules.frontendCommunicator.onAsync("tits-get-item", (itemID: string) => getItem(itemID));
    modules.frontendCommunicator.onAsync("tits-get-triggers", getTriggers);
}