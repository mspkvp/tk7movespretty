/* ==========================================
 * =	Mike Pinto							=
 * =	mspkvp@github.com					=
 * =	©2017 tk7movespretty				=
 * ========================================== */

'use strict';

var importchars = function importchars(){
	d3.json("./assets/data/map_chars.json", function(err, data) {

		for(let i=0; i<data.length; i++){
			/*
			<tr>
				<td class="char-card">
					<img src="./assets/chars/kazumi_thumbnail.png">
					<p>Kazumi</p>
					<div class="frame"></div>
				</td>
			</tr>
			*/
			var tname = data[i].c.split(" ");
			if(data[i].i == "11")
				tname = data[i].c.split("-");
			d3.select(".inner-table table").append("tr")
				.html("<td class=\"char-card\"><img src=\"./assets/chars/"+tname.join("").toLowerCase()+"_thumbnail.png\"><p>"+data[i].c+"</p><div class=\"frame\"></div></td>");
		}
	});
}