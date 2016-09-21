<template>
    <div class="page" style="height: 100%;overflow: hidden">

        <div flex="dir:left box:first" class="search-top">
            <div style="padding-left: 10px" flex="cross:center" @click="realmShow=true">
                {{realm.name}}
            </div>
            <div flex="main:center cross:center">
                <input type="text" placeholder="搜索物品" v-model="term" debounce="500">
                <i style="margin-left: -20px" class="fa fa-times " aria-hidden="true"
                   v-show="term" @click="term='',item={bonusList: []}"></i>

            </div>
        </div>

        <div style="height: 94%;overflow: scroll">
            <div class="search-hot">
                <div class="search-title">热门搜索</div>
                <div class="hot-list">
                    <div v-for="item in itemHots | filterBy 1 in 'type' " class="hot-item"
                         @click="getItemInfoByName(item.name)">
                        {{item.name}}
                    </div>
                </div>
            </div>

            <div class="search-history">
                <div class="search-title">历史搜索</div>
                <div class="history-list">
                    <div v-for="item in historyList" class="history-item" @click="getItemInfoByName(item.name)">
                        {{item.name}}
                    </div>
                </div>
            </div>
        </div>

        <div class="input-result" v-show="termShow">
            <div class="input-list">
                <div v-for="item in data" class="input-item" @click="getItemInfoByName(item)">
                    {{item}}
                </div>
            </div>
        </div>

        <realms :realm-show.sync="realmShow" :realm.sync="realm" :item="item"></realms>
        <result :search-result="searchResult" :result-show="resultShow" :search-item="item"
                :realm-id="realm.id"></result>

        <div class="modal" v-if="item.bonusList.length>0" flex="main:center cross:center">
            <div class="modal-content">
                <div v-for="bl in item.bonusList" class="modal-item"
                     flex="dir:left box:last"
                     @click="getSearchResult(item,bl),item.bonusList=[]">
                    <div> {{item.name}}</div>
                    <div>{{bl | bonus}}</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script type="text/babel">

    import api from '../api';
    import Realms from './Realms.vue';
    import Result from './Result.vue';

    import {
            getItemHot,
            searchAuction,
            getPastRealmItemData
    } from '../vuex/actions';

    export default{
        data(){
            return {
                //服务器
                realm: {"id": 0, "name": "全部", "connected": "全部"},
                realmShow: false,

                //搜索词、联想结果
                term: '',
                termShow: false,
                data: '',

                //搜索结果
                item: {
                    bonusList: []
                },
                resultShow: false,
                flag: 1,

                historyList: []
            }
        },
        components: {Realms, Result},
        watch: {
            term: function (val) {
                if (val.length > 0) {
                    if (this.flag != 2) {
                        this.termShow = true;
                        this.resultShow = false;
                        api.queryNameByTerm(val).then(response=> {
                            this.data = response.data
                        })
                    } else {
                        this.flag = 1;
                    }
                } else {
                    this.termShow = false;
                    this.resultShow = false;
                }
            }
        },
        vuex: {
            getters: {
                itemHots: state=>state.itemHots,                //热门搜索
                searchResult: state=>state.searchResult      //搜索结果
            },
            actions: {
                getItemHot,
                searchAuction,
                getPastRealmItemData
            }
        },
        methods: {
            getSearchResult(item, bl){
                this.resultShow = true;
                this.flag = 2;
                this.term = item.name;

                var storage = window.localStorage;
                var history = JSON.parse(storage.getItem('history') || '[]');
                var index;
                history.forEach((h, i)=> {
                    if (h.id == item.id) index = i;
                });
                if (index !== undefined) history.splice(index, 1);
                history.unshift(item);
                history = history.slice(0, 10);
                this.historyList = history;

                storage.setItem('history', JSON.stringify(history));

                //搜索
                this.searchAuction(this.realm, item.id, bl);

                if (this.realm.id !== 0) this.getPastRealmItemData(this.realm, item.id);
            },
            getItemInfoByName(name){
                api.getItemByName(name).then(response=> {
                    var result = response.data;
                    if (result.length == 0) return;
                    this.item = result[0];

                    if (this.item.bonusList.length > 0 && !this.item.bonusList[0]) this.item.bonusList = [];

                    if (this.item.bonusList.length == 0 || !this.item.bonusList[0]) {
                        this.getSearchResult(this.item)
                    }
                })
            }
        },
        created(){
            this.getItemHot();
            var storage = window.localStorage;
            this.historyList = JSON.parse(storage.getItem('history') || '[]');
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

    .page {
        .input-result {
            position: absolute;
            top: 60px;
            height: 90%;
            width: 100%;
            background: white;
            .input-list {
                padding: 0 10px;
                .input-item {
                    padding: 15px 0;
                    border-bottom: 1px solid #d2d2d2;
                }
            }
        }
        .search-top {
            /*padding: 0 10px;*/
            background: white;
            height: 50px;
            .right-btn {
            }
            input {
                background: #f0f0f0;
                border: 1px solid #f0f0f0;
                border-radius: 3px;
                outline: none;
                width: 90%;
                height: 30px;
                padding-left: 10px;
                font-size: 1.1em;
            }
        }
        .search-hot {
            padding: 20px 10px;
            margin-top: 10px;
            background: white;
            .hot-list {
                margin-top: 10px;
                .hot-item {
                    padding: 5px 10px;
                    border: 1px solid #d2d2d2;
                    border-radius: 3px;
                    margin: 10px 10px 0 0;
                    display: inline-block;
                }
            }
        }

        .search-history {
            padding: 20px 10px;
            margin-top: 10px;
            background: white;
            .history-list {
                margin-top: 10px;
                .history-item {
                    padding: 15px 0;
                    border-bottom: 1px solid #d2d2d2;
                }
            }
        }
    }

    .search-title {

    }

    .modal {
        position: fixed;
        z-index: 15000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
        .modal-content {
            background: white;
            margin: 0 auto;
            padding: 0 10px;
            border: 1px solid #888;
            width: 70%;
            max-height: 80%;
            overflow: auto;

            .modal-item {
                padding: 15px 0;
                border-bottom: 1px solid #d2d2d2;
            }
        }
    }


</style>