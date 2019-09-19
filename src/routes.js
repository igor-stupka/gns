import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Catalog from './components/Catalog';
import Product from './components/Product';
import E404 from './components/E404';

import {store} from './store';


const routes = [
	{
		path: '',
		name: 'catalog',
		component: Catalog,
		// beforeEnter(from, to, next) {
		// 	store.dispatch('catalog/dataRequest');
		// 	next();
		// }
	},
	{
		path: '/catalog/:id',
		name: 'product',
		component: Product
	},
	{
		path: '*',
		component: E404
	}
];

export const router = new VueRouter({
	routes,
	mode: 'history'
});