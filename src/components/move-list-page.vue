<template>
    <div class="main-container">
        <character-list></character-list>
    	<div class="separator"></div>
    	<move-list></move-list>
	</div>
</template>

<script>
import CharacterList from './../components/character-list.vue';
import MoveList from './../components/move-list.vue';

export default {
    components: {
        CharacterList,
        MoveList,
    }
};
</script>