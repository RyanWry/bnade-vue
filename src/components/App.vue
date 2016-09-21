<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
    import store  from '../vuex/store';
    export default{
        store,
        data(){
            return {
                msg: 'hello vue'
            }
        },
        components: {}
    }
</script>

<style>
    html, body, #app {
        background: #f0f0f0;
        margin: 0;
        height: 100%;
        overflow: hidden;
    }
</style>