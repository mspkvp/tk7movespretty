/* ==========================================
 * =	Mike Pinto							=
 * =	mspkvp@github.com					=
 * =	©2017 tk7movespretty				=
 * ========================================== */

'use strict';

var importchars = function importchars(){
	d3.json("./assets/data/map_chars.json", function(err, data) {
		console.log(data);
	});
}