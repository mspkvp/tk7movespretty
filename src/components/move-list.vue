<template>
    <div class="char-movelist">
        <div class="head disable-select">
        	<div class="char-menu-open" onclick="toggleCharMenu()">
        		<i class="fa fa-exchange" aria-hidden="true"></i>
        	</div>
    		<div id="selected-title" class="move-head">{{ characterName }}</div>
    		<div class="opt-buttons">
    			<div class="btn-preferences" v-on:click="togglePreferences()">Preferences</div>
    			<div class="btn-filter" v-on:click="toggleFilters()">Filter</div>
    		</div>
        </div>
        <div id="movelist_tab" class="inner-table">
    		<table class="move-table">
    		    <tr v-for="move in filteredMoveList">
    		        <move-card-special v-if="move.isSpecial()" :move="move"></move-card-special>
    		        <move-card v-else :move="move"></move-card>
		        </tr>
    		</table>
    	</div>
    </div>
</template>

<script>
import MoveCard from './move-card.vue';
import MoveCardSpecial from './move-card-special.vue';
import { filterMoveList } from './../js/filters.js';

export default {
    data() {
        return {
        };
    },
    methods: {
        togglePreferences() {
            this.$store.commit("togglePreferencesDialog");
        },

        toggleFilters() {
            this.$store.commit("toggleFiltersDialog");
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
            let filters = this.$store.state.filters;
            return filterMoveList(this.moveList, filters);
        },
    },

    components: {
        MoveCard,
        MoveCardSpecial,
    }
};
</script>