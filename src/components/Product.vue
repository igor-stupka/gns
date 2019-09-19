<template>
	<div class="container">
		<br>
		<router-link :to="{name: 'catalog'}">
			<a>🡄 Back to catalog</a>
		</router-link>
		<hr>
		<h1>{{ getProduct.name }}</h1>
		<h3>Location: {{ getProduct.location }}</h3>
		<h4>Price: {{ getProduct.currency }}</h4>

	</div>
</template>

<script>
	import {mapGetters} from 'vuex';

	export default {
		computed: {
			...mapGetters('catalog', {
				catalog: 'catalog'
			}),
			getProduct() {
				let pos;

				this.catalog.find(item => {
					if (item.id === this.$route.params.id)
						pos = this.catalog.indexOf(item)
				});

				return this.$store.getters['catalog/product'](pos)
			}
		}
	}
</script>

<style>
</style>