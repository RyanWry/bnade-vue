/**
 * Created by Administrator on 2016/9/8 0008.
 */
import Vue from 'vue'
import VueResource from 'vue-resource'

const API_ROOT = 'http://www.bnade.com/wow/';

Vue.use(VueResource);

// HTTP相关
Vue.http.options.crossOrigin = true;
Vue.http.options.xhr = {withCredentials: true};


Vue.http.interceptors.push((request, next) => {

    // request.headers = request.headers || {};
    // var token = getCookie('token') + '';
    // if (token) {
    //     request.headers.Authorization = 'Bearer ' + token.replace(/(^\")|(\"$)/g, '')
    // }
    // pageLoading(store);

    next((response) => {
        // if (response.status === 500 || response.status === 0) {
        //     showMsg(store, '系统错误，请联系管理员!')
        // } else if (response.status === 401) {
        //     cmsLogout(store);
        // }
    });
});

export const ItemResource = Vue.resource('item{/name}', {}, {
    name: {method: 'GET', url: API_ROOT + 'item/name{/name}'},
    hot: {method: 'GET', url: API_ROOT + 'item/hot'},
    names: {method: 'GET', url: API_ROOT + 'item/names'}
});
export const AuctionResource = Vue.resource('auction{/realmId}{/itemId}{/name}', {}, {
    all: {method: 'GET', url: API_ROOT + 'auction/item{/itemId}'},
    realm: {method: 'GET', url: API_ROOT + 'auction/realm{/realmId}/item{/itemId}'},
    past: {method: 'GET', url: API_ROOT + 'auction/past/realm{/realmId}/item{/itemId}'},
    history: {method: 'GET', url: API_ROOT + 'auction/history/realm{/realmId}/item{/itemId}'},
    summary: {method: 'GET', url: API_ROOT + 'auction/realms/summary'},
    owner: {method: 'GET', url: API_ROOT + 'auction/realm{/realmId}/owner{/name}'}
});
