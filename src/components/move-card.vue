<template>
    <td class="move-card">
        <div class="move-info">
            <div class="move-number">{{ move.getNumber() }}</div>
            <div class="move-title">
                <div class="move-name">{{ move.getName() }}</div>
                <div class="move-hitamount">
                	{{ move.getTotalHits() }} {{ move.getHits().length == 1 ? " Hit" : " Hits" }}
            	</div>
            </div>
            <div class="move-string">
            	<template v-for="command in move.getCommands()">
            		<span v-if="command.hasLetter()" class="move-hint">{{ command.getSymbol() || '' }}</span>
            		<template v-else v-for="input in command.getInputs()">
            			<img v-if="input.isMovement() && input.isHeld() && !input.isNeutral()" class="move-arrow" :src="getHeldDirectionalImage(input)">

            			<img v-else-if="input.isMovement() || input.isNeutral()" class="move-arrow" :src="getDirectionalImage(input)">

            			<img v-else-if="input.isAttack()" class="move-button" :src="getAttackButtonImage(input)">

            			<p v-else-if="input.getSymbol() === '>'" class="move-hint" style="color:#37ff05;font-size:20px;">
			                <i class="fa fa-chevron-right" aria-hidden="true"></i>
			            </p>

			            <p v-else class="move-hint">{{ input.getSymbol() }}</p>
            		</template>
            	</template>
            </div>
            <div class="move-hit-dmg">
                <div class="move-hitlvlstring">
                	<template v-for="(hit, index) in getHitsWithChevrons(move.getHits())">
                		<move-hit-level v-if="!hit.isChevron" :key="index" :hit="hit" :index="index"></move-hit-level>
        				<i v-else class="fa fa-chevron-right" aria-hidden="true"></i>
            		</template>

                	<template v-if="move.hasThrow()">
	                	<i class="fa fa-caret-right" aria-hidden="true"></i>
					    <p class="mv-hitlvl">
					        {{ move.getThrowBreakFrames() }}F BREAK {{ move.getThrowBreak() }}
					    </p>
				    </template>
                </div>
                <move-damage :move="move"></move-damage>
            </div>
        </div>
        <move-extra :move="move"></move-extra>
    </td>
</template>

<script>
import MoveHitLevel from './move-hit-level.vue';
import MoveDamage from './move-damage.vue';
import MoveExtra from './move-extra.vue';

export default {
    props: ['move'],

    methods: {
    	/** A hack for the fact that there is no v-glue directive */
    	getHitsWithChevrons(hits) {
    		let hitsWithChevron = [];

    		hits.map((hit, index) => {
    			hitsWithChevron.push(hit);

    			if (index < hits.length - 1) {
	    			hitsWithChevron.push({ isChevron: true });
    			}
    		});

    		return hitsWithChevron;
    	},

    	getHeldDirectionalImage(input) {
    		return `/assets/arrow/${input.getSymbol().toLowerCase()}p.svg`;
    	},

    	getDirectionalImage(input) {
    		return `/assets/arrow/${input.getSymbol().toLowerCase()}.svg`;
    	},

    	getAttackButtonImage(input) {
    		return `/assets/button/${this.buttonLayout}/${input.getSymbol()}.svg`;
    	},
    },

    computed: {
    	buttonLayout() {
    		return this.$store.state.preferences.buttonLayout;
    	}
    },

    components: {
    	MoveHitLevel,
    	MoveDamage,
    	MoveExtra,
    }
};
</script>