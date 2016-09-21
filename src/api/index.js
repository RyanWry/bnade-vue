/**
 * Created by Administrator on 2016/9/8 0008.
 */
import {
    ItemResource,
    AuctionResource
} from './resource'

export default{
    //物品明细
    getItemByName(name){
        return ItemResource.name({name})
    },

    //热门搜索
    getItemHot(){
        return ItemResource.hot();
    },

    //联想物品名称
    queryNameByTerm(term){
        return ItemResource.names({term})
    },

    getAllAuctionByItemId(itemId, bl){
        return AuctionResource.all({itemId, bl})
    },

    getRealmAuctionByItemId(realmId, itemId, bl){
        return AuctionResource.realm({realmId, itemId, bl})
    },

    getPastRealmAuctionByItemId(realmId, itemId){
        return AuctionResource.past({realmId, itemId})
    }
}