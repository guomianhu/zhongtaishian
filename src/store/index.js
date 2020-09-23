import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        countdown:{
            hours:0,
            minutes:0,
            seconds:0
        },
        getindexbanner:[],
        cartlength:0
    },
    getters,
    actions,
    mutations,
})