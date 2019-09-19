import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import catalog from './modules/catalog';

export const store = new Vuex.Store({
	modules: {
		catalog
	},
	strict: process.env.NODE_ENV !== 'production'
})