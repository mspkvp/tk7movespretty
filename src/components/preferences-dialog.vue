<template>
    <div id="preferences" class="preferences-dialog" v-bind:style="{ visibility }">
    	<div class="pref-title disable-select">
    		Preferences
    	</div>
    	<table class="pref-list">
    		<tr class="pref-language">
    			<td class="pref-id disable-select">Language</td>
    			<td class="pref-selection">
    			  	<select v-model="language" :change="updatePreferences()">
                        <option v-for="(option, index) in languages" v-bind:value="index">
                            {{ option }}
                        </option>
                    </select>
    			</td>
    		</tr>
    		<tr class="pref-platform">
    			<td class="pref-id disable-select">Button Layout</td>
    			<td class="pref-selection">
                    <select v-model="buttonLayout" :change="updatePreferences()">
                        <option v-for="option in buttonLayouts" v-bind:value="option.value">
                            {{ option.text }}
                        </option>
                    </select>
    			</td>
    		</tr>
    	</table>
    	<div class="pref-close disable-select" v-on:click="toggle()"><i class="fa fa-times" aria-hidden="true"></i></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            buttonLayout: this.$store.state.preferences.buttonLayout,
            language: this.$store.state.preferences.language,
        };
    },

    methods: {
        toggle() {
            this.$store.commit('togglePreferencesDialog');
        },

        updatePreferences() {
            this.$store.commit('updatePreferences', {
                buttonLayout: this.buttonLayout,
                language: this.language,
            });
        }
    },

    computed: {
        visibility() {
            return this.$store.state.preferences.showDialog ? 'visible' : 'hidden';
        },

        buttonLayouts() {
            return this.$store.state.preferences.buttonLayouts;
        },

        languages() {
            return this.$store.state.preferences.languages;
        }
    }
}
</script>