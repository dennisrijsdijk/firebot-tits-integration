import {Effects} from "@crowbartools/firebot-custom-scripts-types/types/effects";
import EffectType = Effects.EffectType;
import {Firebot} from "@crowbartools/firebot-custom-scripts-types";
import {throwItems} from "../tits-connector";
import {modules} from "../main";

interface EffectModel {
    selectedItems: {[x: string]: number},
    delayTime: number,
    throwsAmount: number
}

interface Scope {
    effect: EffectModel;
    [x: string]: any;
}

export const ThrowEffectType: Firebot.EffectType<EffectModel> = {
    definition: {
        id: "tits:throw",
        name: "T.I.T.S Throw Item(s)",
        description: "Throw one or more items with T.I.T.S",
        icon: "fad fa-dumpster-fire",
        categories: ["common", "integrations", "fun"]
    },
    optionsTemplate: `
        <eos-container header="Settings" pad-top="true">
            <div class="input-group">
                <span class="input-group-addon">Delay (in seconds)</span>
                <input
                    class="form-control"
                    type="number"
                    ng-model="effect.delayTime">
                <span class="input-group-addon">Amount to throw</span>
                <input
                    class="form-control"
                    type="number"
                    min="1"
                    ng-model="effect.throwsAmount">
            </div>
        </eos-container>
    <eos-container header="Items">
      <div class="effect-setting-container">
        <div class="input-group">
          <span class="input-group-addon">Filter by item:</span>
          <input type="text" class="form-control" ng-model="searchText" placeholder="Enter your search term here..." aria-describeby="tits-item-search-box">
        </div>
      </div>
    
      <div class="effect-setting-container setting-padtop">
        <table ng-if="throwItems != null">
            <tbody ng-repeat="(id, item) in throwItems">
                <tr ng-if="item.name.includes(searchText)">
                    <td>{{item.name}}</td>
                    <td><img ng-src="data:image/png;base64,{{item.encodedImage}}" alt="{{item.name}}" style="max-width: 50%; max-height: 50%; display: block;"/></td>
                    <td><input type="number" class="form-control" ng-model="item.amount" ng-change="itemUpdated(id)"></td>
                </tr>
            </tbody>
            
        </table>
            
                
            </div>
            <div ng-if="throwItems == null" class="muted">
                No items found. Is T.I.T.S running?
            </div>
        <p>
            <button class="btn btn-link" ng-click="populateItems()">Refresh Items</button>
        </p>
      </div>
    </eos-container>
    `,
    optionsController: ($scope: Scope, backendCommunicator: any, $q: any) => {
        $scope.searchText = "";

        $scope.throwItems = null;

        $scope.populateItems = () => {
            // @ts-ignore
            $q.when(backendCommunicator.fireEventAsync("tits-get-items-with-images")).then(
                (items: {ID: string, name: string, encodedImage: string, amount?: number}[]) => {
                    $scope.throwItems = {};
                    items.forEach(function (item, index) {
                        if (item.ID in $scope.effect.selectedItems) {
                            this[index].amount = $scope.effect.selectedItems[item.ID];
                        }
                        else {
                            item.amount = 0;
                        }
                        $scope.throwItems[item.ID] = {name: item.name, encodedImage: item.encodedImage, amount: item.amount}

                    }, items);
                }
            );
        };

        $scope.itemUpdated = (item: string) => {
            if ($scope.throwItems[item].amount == 0) {
                delete $scope.effect.selectedItems[item];
            }
            else {
                $scope.effect.selectedItems[item] = $scope.throwItems[item].amount;
            }
        }

        if ($scope.effect.selectedItems == null) {
            $scope.effect.selectedItems = {};
        }

        if ($scope.effect.throwsAmount == null) {
            $scope.effect.throwsAmount = 50
        }

        if ($scope.effect.delayTime == null) {
            $scope.effect.delayTime = 0.05;
        }

        $scope.populateItems();
    },
    optionsValidator: () => {
        return [];
    },
    onTriggerEvent: async ({effect}) => {
        let throwingItems: string[] = [];
        for (let selectedItemsKey in effect.selectedItems) {
            for (let i = 0; i < effect.selectedItems[selectedItemsKey]; i++) {
                throwingItems.push(selectedItemsKey);
            }
        }
        await throwItems(throwingItems, effect.delayTime, effect.throwsAmount);
    }
}