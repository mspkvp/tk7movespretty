<template>
    <div class="header disable-select">
		<img src="/assets/img/logo.png" v-on:click="goToIndex()">
		<h3 class="glow">MOVELIST</h3>
	</div>
</template>

<script>
export default {
	methods: {
		goToIndex() {
			this.$router.push({ name: 'index' });
		}
	}
};
</script>