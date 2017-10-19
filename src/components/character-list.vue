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
			</table>
	    </div>
	</div>
</template>

<script>
export default {
    data: {
    },
    methods: {
        toggleCharMenu() {
            console.log("toggle");
        }
    }
}
</script>