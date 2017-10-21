<template>
    <div class="char-movelist">
        <div class="head disable-select">
        	<div class="char-menu-open" v-on:click="showCharacterList()">
        		<i class="fa fa-exchange" aria-hidden="true"></i>
        	</div>
    		<div id="selected-title" class="move-head">
    		    {{ characterName }}
    		    <i v-if="loading" class="loader fa fa-spinner" aria-hidden="true"></i>
		    </div>
    		<div class="opt-buttons">
    			<div class="btn-preferences" v-on:click="togglePreferences()">Preferences</div>
    			<div class="btn-filter" v-on:click="toggleFilters()">Filter</div>
    		</div>
        </div>
        <div id="movelist_tab" class="inner-table">
    		<table class="move-table">
    		    <tr v-for="move in filteredMoveList" :class="{ loading: loading }">
    		        <move-card-special v-if="move.isSpecial()" :move="move"></move-card-special>
    		        <move-card v-else :move="move"></move-card>
		        </tr>
    		</table>
    	</div>
    </div>
</template>

<style>
.loader {
    margin-left: 10px;
    animation: spin 1.5s linear infinite;
}

.loading {
    opacity: 0.5;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>

<script>
import MoveCard from './move-card.vue';
import MoveCardSpecial from './move-card-special.vue';
import { filterMoveList } from './../js/filters.js';
import { mutations, actions } from './../js/store.js';

export default {
    methods: {
        showCharacterList() {
            this.$store.commit(mutations.TOGGLE_CHARACTER_LIST);
        },

        togglePreferences() {
            this.$store.commit(mutations.TOGGLE_PREFERENCES_DIALOG);
        },

        toggleFilters() {
            this.$store.commit(mutations.TOGGLE_FILTERS_DIALOG);
        },
    },

    computed: {
        characterName() {
            let selectedCharacter = this.$store.state.selectedCharacter;
            let characterList = this.$store.state.characterList;
            let character = characterList.find((char) => char.getId() == selectedCharacter);

            if (character) {
                return character.getFullName();
            } else {
                return 'Character unknown';
            }
        },

        moveList() {
            return this.$store.state.moveList;
        },

        filteredMoveList() {
            return filterMoveList(this.moveList, this.$store.state.filters);
        },

        loading() {
            return this.$store.state.loadingMoveList;
        }
    },

    components: {
        MoveCard,
        MoveCardSpecial,
    }
};
</script>