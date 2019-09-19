<template>
  <div id="app">
  	<transition name="slide" mode="out-in">
    	<router-view></router-view>
    </transition>
  </div>
</template>

<script>


export default {
  name: 'app',
  mounted() {
  	this.$store.dispatch('catalog/dataRequest');
  }
}
</script>

<style lang="sass">
#app
body
	font: 400 16px 'Avenir', Helvetica, Arial, sans-serif
	min-height: 100vh
	width: 100%
	-webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    overflow-x: hidden

*
	box-sizing: border-box
	list-style-type: none
	margin: 0
	padding: 0
	border: none
	outline: none
	background: none
	text-decoration: none
	&::before,
	&::after
		box-sizing: border-box


button, a
	cursor: pointer
	&:hover
		text-decoration: none
	
img
	max-width: 100%

.slide-enter-active 
		animation: slideIn .3s

.slide-leave-active 
	animation: slideOut .3s

@keyframes slideIn
	from
		opacity: 0
	to
		opacity: 1

@keyframes slideOut
	from
		opacity: 1
	to
		opacity: 0

</style>
