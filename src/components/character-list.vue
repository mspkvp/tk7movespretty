<template>
    <div id="charmenu" class="char-menu disable-select">
	    <table class="head">
			<tr>
				<td class="char-menu-close" onclick="toggleCharMenu()">
					<i class="fa fa-times" aria-hidden="true"></i>
				</td>
				<td class="char-head">CHARACTERS</td>
			</tr>
	    </table>
	    <div class="inner-table">
		    <table>
		        <tr v-for="(character, index) in characters">
		            <td class="char-card" :class="{ selected: selected == character.getId() }" :id="character.getSlug()" v-on:click="selectCharacter(character.getId())">
                        <img :src="getThumbnail(character)">
                        <p>{{ character.getName() }}</p>
                    </td>
                </tr>
			</table>
	    </div>
	</div>
</template>

<script>
export default {
    methods: {
        toggleCharMenu() {
            console.log("toggle");
        },

        getThumbnail(character) {
            return `/assets/chars/${character.getThumbnailName()}_thumbnail.png`;
        },

        selectCharacter(characterId) {
            this.$store.dispatch('selectCharacter', {characterId: characterId });
        },
    },

    computed: {
        characters() {
            return this.$store.state.characterList;
        },

        selected() {
            return this.$store.state.selectedCharacter;
        }
    }
};
</script>