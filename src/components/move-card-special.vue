<template>
    <td class="move-card">
        <div class="move-info">
            <div class="move-number" v-html="number"></div>
            <div class="move-title">
                <div class="move-name" style="margin-bottom:5px;">
                    {{ move.getName() }}
                </div>
            </div>
        </div>
    </td>
</template>

<script>
export default {
    props: ['move'],
    data() {
        return {
            number: '&#9733;',
        }
    }
};
</script>