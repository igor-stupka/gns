<template>
	<div class="container">
		<h1>Catalog</h1>
		<hr>
		Search by
		<input type="radio" id="radioName" v-model="searchBy" value="name" checked>
		<label for="radioName">name</label>
		<input type="radio" id="radioLocation" v-model="searchBy" value="location">
		<label for="radioLocation">location</label>
		<div>
			<input type="text" v-model="query" placeholder="Start typing..." class="searcher">
		</div>
		<br>
		

		<table class="table table-bordered table-hover">
			<thead>
				<tr>
					<th>#</th>
					<th>
						Name
						<span>
							<button class="sort-button" @click="sortBy('name')">🡇</button>
							<button class="sort-button" @click="sortBy('-name')">🡅</button>
						</span>
					</th>
					<th>
						Location
						<span>
							<button class="sort-button" @click="sortBy('location')">🡇</button>
							<button class="sort-button" @click="sortBy('-location')">🡅</button>
						</span>
					</th>
					<th>
						Currency
						<span>
							<button class="sort-button" @click="sortBy('currency')">🡇</button>
							<button class="sort-button" @click="sortBy('-currency')">🡅</button>
						</span>
					</th>
				</tr>
			</thead> 
			<tbody>
				<tr v-for="(product, index) in searchResult" :key="index">

					<td>{{ index + 1 + '.' }}</td>
			
					<router-link tag="td" :to="'/catalog/' + product.id">
						<input type="text" 
							   @input="changeValue(index, 'name', $event)"
							   :name="'name'+index"
							   v-validate="'alpha|required'"
							   class="table-input"
							   :value="product.name">
						<a>🡆</a>
					</router-link>

					<td>
						<input type="text" 
							   @input="changeValue(index, 'location', $event)"
							   :name="'location'+index"
							   v-validate="'alpha_spaces|required'"
							   class="table-input"
							   :value="product.location">
					</td>

					<td>
						<input type="text" 
							   @input="changeValue(index, 'currency', $event)"
							   :name="'currency'+index"
							   v-validate="'numeric|required'"
							   class="table-input"
							   :value="product.currency">
					</td>

				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td>
						<b>Total: {{ totalPrice }}</b>
					</td>
				</tr>
			</tfoot>

		</table>
	</div>
</template>

<script>
	import { mapGetters,  mapActions} from 'vuex'

	export default {
		data() {
			return {
				query: '',
				searchBy: 'name'
			}
		},
		computed: {
			...mapGetters('catalog', {
				catalog: 'catalog',
			}),
			searchResult() {
				return this.catalog.filter(str => {
					return str[this.searchBy].toLowerCase().indexOf(this.query.toLowerCase()) >= 0;
				})
			},
			totalPrice() {
				return this.searchResult.reduce(function(sum, current) {
					return sum += Number.parseInt(current.currency);
				}, 0);
			}
		},
		methods: {
			...mapActions('catalog', {
				updateCat: 'updateCatalog',
			}),
			changeValue(index, prop, event) {
				this.$store.commit('catalog/editValue', {
					item: index,
					field: prop,
					value: event.target.value
				})
			},
			sortBy(criterion) {
				this.catalog.sort(this.dynamicSort(criterion))
			},
			dynamicSort(property) {
				let sortOrder = 1;

				if (property[0] === "-") {
					sortOrder = -1;
					property = property.substr(1);
				}
				return function (a,b) {
					let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
					return result * sortOrder;
				}
			}
		}
	}
</script>

<style lang="sass">
.table-input
	cursor: pointer
	border: 1px solid transparent
	padding: 3px 5px
	&:hover
		background-color: #e2e2e2
	&:focus
		cursor: text
		border-color: #ccc
	&.invalid
		border-color: red
		color: red
.searcher
	border: 1px solid #ccc
	padding: 5px
	width: 300px

.sort-button
	font-weight: 600
	color: #337ab7
	&:hover
		color: #23527c
</style>