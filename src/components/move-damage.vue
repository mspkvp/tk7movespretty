<template>
    <div class="move-dmg">
        <p class="mv-frames">{{ move.getTotalDamage() }}</p>
        <p class="mv-id">Damage</p>
        <div class="move-hitdmg-section">
            <i :id="getCssId(move)" class="fa fa-plus-square" aria-hidden="true" v-on:mouseenter="showHitDamage" v-on:mouseleave="hideHitDamage()"></i>
            <div class="move-hitdmg" :style="{ display : visible ? 'initial' : 'none' }">
                {{ move.getDamages().join('+') }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['move'],

    data() {
        return { visible: false };
    },

    methods: {
        getCssId(move) {
            return `dmgmove${move.getNumber()}`;
        },

        showHitDamage() {
            this.visible = true;
        },

        hideHitDamage() {
            setTimeout(() => this.visible = false, 3000);
        }
    }
}
</script>