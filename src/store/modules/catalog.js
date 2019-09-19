import axios from 'axios';

export default {
	namespaced: true,
	state: {
		catalog: []
	},
	getters: {
		catalog(state) {
			return state.catalog;
		},
		product: (state) => (id) => {
			return state.catalog[id];
		}
	},
	mutations: {
		loadItems(state, data) {
			state.catalog = data;
		},
		editValue(state, payload) {
			state.catalog[payload.item][payload.field] = payload.value;
		}
	},
	actions: {
		dataRequest(store) {
			axios.get('https://api.myjson.com/bins/o1q61')
				.then(response => {
					store.commit('loadItems', response.data);
				});
		}
	}
}