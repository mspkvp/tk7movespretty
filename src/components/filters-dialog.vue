<template>
	<div id="filter" class="preferences-dialog" v-bind:style="{ visibility }">
		<div class="pref-title disable-select">
			Filter
		</div>
		<table class="pref-list">
			<tr class="pref-language">
				<td class="pref-id disable-select">Move name</td>
				<td class="pref-selection">
					<input id="move-name-filter" v-model="moveName" v-on:keyup="updateFilters()"/>
				</td>
			</tr>
			<tr class="pref-language">
				<td class="pref-id disable-select">Move string</td>
				<td class="pref-selection">
					<input id="move-string-filter" v-model="moveString" v-on:keyup="updateFilters()"/>
				</td>
			</tr>
			<tr class="pref-language">
				<td class="pref-id disable-select">Special Properties</td>
				<td class="pref-selection">
					<p>
						<label>SPIN</label>
						<input id="move-property-spin-filter" type="checkbox" v-model="specialProperties.spin" :change="updateFilters()"/>
					</p>
					<p>
						<label>TRACK</label>
						<input id="move-property-track-filter" type="checkbox" v-model="specialProperties.track" :change="updateFilters()"/>
					</p>
					<p>
						<label>ARMOR</label>
						<input id="move-property-armor-filter" type="checkbox" v-model="specialProperties.armor" :change="updateFilters()"/>
					</p>
				</td>
			</tr>
			<tr class="pref-language">
				<td class="pref-id disable-select">Frames</td>
				<td class="pref-selection">
					<p>
						<label>START</label>
						<select id="frame-property-start-comparison-filter" v-model="frameProperties.start.comparison" :change="updateFilters()">
							<option v-for="option in comparisons" :value="option">{{ option }}</option>
						</select>
						<input id="frame-property-start-filter" style="width: 30px;" type="number" v-model="frameProperties.start.value" v-on:keyup="updateFilters()"/>
					</p>
					<p>
						<label>BLOCK</label>
						<select id="frame-property-block-comparison-filter" v-model="frameProperties.block.comparison" :change="updateFilters()">
							<option v-for="option in comparisons" :value="option">{{ option }}</option>
						</select>
						<input id="frame-property-block-filter" style="width: 30px;" type="number" v-model="frameProperties.block.value" v-on:keyup="updateFilters()"/>
					</p>
					<p>
						<label>HIT</label>
						<select id="frame-property-hit-comparison-filter" v-model="frameProperties.hit.comparison" :change="updateFilters()">
							<option v-for="option in comparisons" :value="option">{{ option }}</option>
						</select>
						<input id="frame-property-hit-filter" style="width: 30px;" type="number" v-model="frameProperties.hit.value" v-on:keyup="updateFilters()"/>
					</p>
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
			moveName: '',

            moveString: '',

            specialProperties: {
                spin: false,
                armor: false,
                track: false,
            },

            frameProperties: {
                start: {
                    value: '',
                    comparison: '=',
                },
                block: {
                    value: '',
                    comparison: '=',
                },
                hit: {
                    value: '',
                    comparison: '=',
                },
            },

            comparisons: ['=', '<=', '<', '>=', '>']
		};
	},

	methods: {
        toggle() {
            this.$store.commit('toggleFiltersDialog');
        },

        updateFilters() {
            this.$store.commit('updateFilters', {
                moveName: this.moveName,
                moveString: this.moveString,
                specialProperties: this.specialProperties,
                frameProperties: this.frameProperties,
            });
        }
    },

    computed: {
        visibility() {
            return this.$store.state.filters.showDialog ? 'visible' : 'hidden';
        }
    }
}
</script>