<template>
    <div class="realm" v-show="realmShow">
        <div class="search-top" flex="dir:left box:last">
            <div flex="main:center cross:center">
                <input type="text" v-model="name" placeholder="搜索服务器">

                <i style="margin-left: -20px" class="fa fa-times " aria-hidden="true"
                   v-show="name" @click="name=''"></i>
            </div>
            <div flex="cross:center" @click="realmShow=false" style="padding-right: 10px">取消</div>
        </div>
        <div class="realm-content">
            <div class="realm-list">
                <div v-for="item in realms | filterBy name in  'connected' " class="realm-item"
                     @click="selectRealm(item)">
                    {{item.connected}}
                </div>
            </div>
        </div>

    </div>
</template>

<script type="text/babel">
    import realms from '../realm';

    export default{
        name: 'Realms',
        props: ['realm', 'realmShow', 'item'],
        data(){
            return {
                name: '',
                realms
            }
        },
        components: {},
        methods: {
            selectRealm(realm){
                this.realm = realm;
                this.realmShow = false;
                if (this.item.id) {
                    this.$parent.getSearchResult(this.item)
                }
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
    .realm {
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: absolute;
        z-index: 1000;
        top: 0;

        .realm-content{
            background: white;
            height: 100%;
            margin-top: 10px;
            .realm-list {
                height: 91%;
                overflow: scroll;
                .realm-item {
                    padding: 10px;
                    border-bottom: 1px solid #f0f0f0;
                }
            }
        }
    }
</style>