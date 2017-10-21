<template>
    <div id="charmenu" class="char-menu disable-select" :style="{ display: visibility }">
	    <table class="head">
			<tr>
				<td class="char-menu-close" v-on:click="hideCharacterList()">
					<i class="fa fa-times" aria-hidden="true"></i>
				</td>
				<td class="char-head">CHARACTERS</td>
			</tr>
	    </table>
	    <div class="inner-table">
		    <table>
		        <tr v-for="(character, index) in characters">
		            <td class="char-card" :class="{ selected: selected == character.getId() }" :id="character.getSlug()" v-on:click="selectCharacter(character.getId())">
                        <router-link :to="getCharacterLink(character)">
                            <img :src="getThumbnail(character)">
                            <p>{{ character.getName() }}</p>
                        </router-link>
                    </td>
                </tr>
			</table>
	    </div>
	</div>
</template>

<script>
import { mutations, actions } from './../js/store.js';

export default {
    methods: {
        hideCharacterList() {
            this.$store.commit(mutations.TOGGLE_CHARACTER_LIST);
        },

        getThumbnail(character) {
            return `/assets/chars/${character.getThumbnailName()}_thumbnail.png`;
        },

        getCharacterLink(character) {
            return `/character/${character.getSlug().toLowerCase()}/`;
        },

        selectCharacter(characterId) {
            this.$store.dispatch(mutations.SELECT_CHARACTER, { characterId: characterId });
        },
    },

    computed: {
        visibility() {
            return this.$store.state.showCharacterList ? 'initial' : 'none';
        },

        characters() {
            return this.$store.state.characterList;
        },

        selected() {
            return this.$store.state.selectedCharacter;
        }
    }
};
</script>