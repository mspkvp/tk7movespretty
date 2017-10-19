<template>
	<div id="filter" class="preferences-dialog">
		<div class="pref-title disable-select">
			Filter
		</div>
		<table class="pref-list">
			<tr class="pref-language">
				<td class="pref-id disable-select">Move name</td>
				<td class="pref-selection">
					<input id="move-name-filter" onkeyup="filterMoveList()"/>
				</td>
			</tr>
			<tr class="pref-language">
				<td class="pref-id disable-select">Move string</td>
				<td class="pref-selection">
					<input id="move-string-filter" onkeyup="filterMoveList()"/>
				</td>
			</tr>
			<tr class="pref-language">
				<td class="pref-id disable-select">Special Properties</td>
				<td class="pref-selection">
					<p>
						<label>SPIN</label>
						<input id="move-property-spin-filter" type="checkbox" onchange="filterMoveList()"/>
					</p>
					<p>
						<label>TRACK</label>
						<input id="move-property-track-filter" type="checkbox" onchange="filterMoveList()"/>
					</p>
					<p>
						<label>ARMOR</label>
						<input id="move-property-armor-filter" type="checkbox" onchange="filterMoveList()"/>
					</p>
				</td>
			</tr>
			<tr class="pref-language">
				<td class="pref-id disable-select">Frames</td>
				<td class="pref-selection">
					<p>
						<label>START</label>
						<select id="frame-property-start-comparison-filter" onchange="filterMoveList()">
							<option>=</option>
							<option>&lt;=</option>
							<option>&lt;</option>
							<option>&gt;=</option>
							<option>&gt;</option>
						</select>
						<input id="frame-property-start-filter" style="width: 30px;" type="number" onkeyup="filterMoveList()"/>
					</p>
					<p>
						<label>BLOCK</label>
						<select id="frame-property-block-comparison-filter" onchange="filterMoveList()">
							<option>=</option>
							<option>&lt;=</option>
							<option>&lt;</option>
							<option>&gt;=</option>
							<option>&gt;</option>
						</select>
						<input id="frame-property-block-filter" style="width: 30px;" type="number" onkeyup="filterMoveList()"/>
					</p>
					<p>
						<label>HIT</label>
						<select id="frame-property-hit-comparison-filter" onchange="filterMoveList()">
							<option>=</option>
							<option>&lt;=</option>
							<option>&lt;</option>
							<option>&gt;=</option>
							<option>&gt;</option>
						</select>
						<input id="frame-property-hit-filter" style="width: 30px;" type="number" onkeyup="filterMoveList()"/>
					</p>
				</td>
			</tr>
		</table>
		<div class="pref-close disable-select" onclick="toggleFilter()"><i class="fa fa-times" aria-hidden="true"></i></div>
	</div>
</template>

<script>
export default {

}
</script>