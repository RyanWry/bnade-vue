/**
 * Created by Administrator on 2016/9/8 0008.
 */

import Vue from 'vue'
import Router from 'vue-router'
import filters from './filters'
import App from './components/App.vue'
import 'flex.css'
import 'font-awesome/css/font-awesome.min.css'
import './lib/wow.css';
// import Mint from 'mint-ui';
// import 'mint-ui/lib/style.css';
// Vue.use(Mint);

import Home from './components/Home.vue';
import Search from './components/Search.vue';
import Realms from './components/Realms.vue';

Vue.use(Router);

// register filters globally
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

var router = new Router();

router.map({
    '/': {
        component: Search,
    }
});

router.start(App, '#app');