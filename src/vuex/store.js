/**
 * Created by Administrator on 2016/9/18 0018.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as Types from './mutation-types';

Vue.use(Vuex);

const state = {
    itemHots: [],
    searchResult: [],
    pastData: []
};

const mutations = {
    [Types.ITEM_HOT](state, data){
        state.itemHots = data
    },
    [Types.SEARCH_RESULT](state, data){
        state.searchResult = data;
    },
    [Types.PAST_REALM_ITEM](state, data){
        state.pastData = data;
    }
};

export default new Vuex.Store({
    state,
    mutations
})