/**
 * Created by Administrator on 2016/9/18 0018.
 */
import api from '../api';
import * as Types from './mutation-types';

export const getItemHot = ({dispatch}) => {
    api.getItemHot().then(response=> {
        dispatch(Types.ITEM_HOT, response.data)
    })
};

export const searchAuction = ({dispatch}, realm, itemId, bl)=> {

    var promise = realm.id == 0
        ? api.getAllAuctionByItemId(itemId, bl)
        : api.getRealmAuctionByItemId(realm.id, itemId, bl);

    promise.then(response=> {
        var data = response.data;
        var result = [];
        if (realm.id != 0) {
            data.forEach(item=> {
                result.push({
                    realmId: realm.id,
                    price: item[3] / item[4],
                    owner: item[0],
                    quantity: item[4],
                    time: '',
                    timeLeft: item[5],
                    startPrice: item[2]
                })
            })
        } else {
            data.forEach(item=> {
                result.push({
                    realmId: item[0],
                    price: item[1],
                    owner: item[2],
                    quantity: item[3],
                    time: item[4],
                    timeLeft: item[5]
                })
            })
        }

        result.sort(function (a, b) {
            return a.price - b.price
        });

        dispatch(Types.SEARCH_RESULT, result)
    });
};

export const getPastRealmItemData = ({dispatch}, realm, itemId) => {
    if (realm.id === 0)  return;

    api.getPastRealmAuctionByItemId(realm.id, itemId).then(response=> {
        var data = response.data;
        data.sort(function (a, b) {
            return a[2] - b[2];
        });

        dispatch(Types.PAST_REALM_ITEM, data)
    })
};