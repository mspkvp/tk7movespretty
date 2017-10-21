<template>
    <div class="move-extra">
        <div class="mv-section">
            <div class="move-special">
                <p v-if="move.hasSpin()" class="spin">SPIN</p>
                <p v-if="move.hasArmor()" class="armor">ARMOR</p>
                <p v-if="move.hasTracking()" class="track">TRACK</p>
            </div>
            <table class="move-frames">
                <tr class="move-startf">
                    <td class="mv-id">Start</td>
                    <td class="mv-frames">
                        {{move.getStartUpFrames()}}F
                    </td>
                </tr>

                <tr v-if="move.getStartUpFrames() > 0" class="move-startf-seg">
                    <td>
                        {{ move.getStartUpFrames() }}F = {{ move.getSegmentedStartFrames().join("+") }}
                    </td>
                </tr>

                <tr class="move-blockf">
                    <td class="mv-id">Block</td>
                    <td :class="getBlockFrameCssClasses(move)">
                        {{ (move.getBlockFrames() > -1 ? "+" : "" ) + move.getBlockFrames() }}
                    </td>
                </tr>
                <tr class="move-hitf">
                    <td class="mv-id">Hit</td>
                    <td class="mv-frames">
                        {{ (move.getAdvantageFrames() > 0 ? "+" : "") + move.getAdvantageFrames() }}
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    props: ['move'],

    methods: {
        getBlockFrameCssClasses(move) {
            let classes = ['mv-frames'];

            if (move.getBlockFrames() > -1) {
                classes.push('blkpositive');
            } else if (move.getBlockFrames() < -10 ) {
                classes.push('blknegative');
            } else {
                classes.push('blkmild');
            }

            return classes.join(' ');
        }
    }
};
</script>