<template>
    <p :class="getHitLevelClasses(hit)">
        {{ hit.getLevel() }} {{ hit.isThrow() ? "Throw" : "" }}
    </p>
</template>

<script>
export default {
    props: ['hit', 'index'],

    methods: {
        getHitLevelClasses(hit) {
    		return `mv-hitlvl hit${hit.getLevel().toLowerCase()}`;
    	}
    }
};
</script>