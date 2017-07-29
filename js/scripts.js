/* ==========================================
 * =	Mike Pinto							=
 * =	mspkvp@github.com					=
 * =	©2017 tk7movespretty				=
 * ========================================== */

'use strict';

var char_data = [], ctrls_map, hits_map = [],
	selected_char = "32";

function isLetter(c) {
  return c.toLowerCase() != c.toUpperCase();
}

String.prototype.hexEncode = function(){
    var hex, i;

    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
}

String.prototype.hexDecode = function(){
    var j;
    var hexes = this.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}

var importdata = function importdata(){
	d3.json("./assets/data/map_hits.json", function(err, data) {
		for(var h in data)
			hits_map[data[h].i] = data[h].h;
		d3.json("./assets/data/map_ctrls.json", function(err, data) {
			ctrls_map = data;

			d3.json("./assets/data/map_chars.json", function(err, data) {
				for(var h in data)
					char_data[data[h].i] = {c: data[h].c, n: data[h].n};

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
					d3.select(".char-menu > .inner-table > table").append("tr")
						.html("<td class=\"char-card\" id=\""+data[i].c.split(" ")[0]+"\"><img src=\"./assets/chars/"+tname.join("").toLowerCase()+"_thumbnail.png\"><p>"+data[i].c+"</p><div class=\"frame\"></div></td>");
					d3.select("#"+data[i].c.split(" ")[0]).on("click", function(){fetchmovelist(data[i].i)});
				}
				var id_string = char_data[selected_char].c.split(" ");
				d3.select("#"+id_string[0]).classed("selected", true);
				fetchmovelist(selected_char);
			});
		});
	});
}

var fetchmovelist = function fetchmovelist(index) {
	/*<td class="move-card">
		<div class="move-info">
			<div class="move-number">1</div>
			<div class="move-name">Move Name</div>
			<div class="move-string">
				<p class="move-hint">Move Status</p>
				<img class="move-arrow" src="./assets/arrow/f.svg">
				<img class="move-arrow" src="./assets/arrow/dfp.svg">
				<img class="move-button" src="./assets/button/XBOX/1+2.svg">
				<img class="move-button" src="./assets/button/XBOX/1+3.svg">
				<img class="move-button" src="./assets/button/XBOX/1+2+3+4.svg">
			</div>
			<div class="move-hits">
				<div class="move-hitlvlstring">	
					<p class="mv-hitlvl hithigh">High</p>
					<i class="fa fa-chevron-right" aria-hidden="true"></i>
					<p class="mv-hitlvl hitmid">Mid</p>
					<i class="fa fa-chevron-right" aria-hidden="true"></i>
					<p class="mv-hitlvl hitlow">Low</p>
				</div>
				<div class="move-hitamount">3 Hit Combo</div>	
			</div>

		</div>
		<div class="move-extra">
			<div class="mv-section">
				<div class="move-special">
					<p class="spin">SPIN</p>
					<p class="armor">ARMOR</p>
					<p class="homing">HOMING</p>
				</div>
				<table class="move-frames">
					<tr class="move-startf">
						<td class="mv-id">Start</td>
						<td class="mv-frames">13F</td>
					</tr>
					<tr class="move-blockf">
						<td class="mv-id">Block</td>
						<td class="mv-frames negative">-17</td>
					</tr>
					<tr class="move-hitf">
						<td class="mv-id">Hit</td>
						<td class="mv-frames">+20</td>
					</tr>
				</table>
			</div>
			<div class="move-dmg">
				<p class="mv-frames">25</p>
				<p class="mv-id">Damage</p>
				<div class="move-hitdmg">
					<i class="fa fa-arrow-right" aria-hidden="true"></i>7 + 8 + 12
				</div>
			</div>
		</div>
	</td>
	*/
  	function toHexArr(str) {
	    var result = [];
	    for (var i=0; i<str.length; i++) {
	      result.push("\\u"+str.charCodeAt(i).toString(16));
	    }
	    return result;
  	}

	var lang = 1;
	var jap = false;

	d3.json("./assets/data/movelists/MOVELIST_"+index+".json", function(err, data) {
		//remove other moves
		d3.select(".move-table").remove();
		d3.select(".char-movelist .inner-table").html("<table class=\"move-table\"></table>");
		//de-select card
		var id_string = char_data[selected_char].c.split(" ");
		d3.select("#"+id_string[0]).classed("selected", false);
		selected_char = index;
		id_string = char_data[selected_char].c.split(" ");
		d3.select("#"+id_string[0]).classed("selected", true);
		for(let i=0; i<data.moves.length; i++){
			// Number + Move Name
			var html_string = "<td class=\"move-card\"><div class=\"move-info\"><div class=\"move-number\">"+data.moves[i].number+"</div><div class=\"move-name\">"+data.moves[i].name[jap?0:1]+"</div><div class=\"move-string\">";

			// Move String
			let commands = data.moves[i].command[lang].split(" ");
			for( let c=0; c<commands.length;c++){
				if(/[a-z]/.test(commands[c].toLowerCase()))
					html_string += "<p class=\"move-hint\">"+commands[c]+"</p>";
				else {
					for( let m=0; m<commands[c].length; m++){
						try{
							if( isLetter(ctrls_map[commands[c].charAt(m)])){
								if(	ctrls_map[commands[c].charAt(m)] === ctrls_map[commands[c].charAt(m)].toLowerCase() || ctrls_map[commands[c].charAt(m)] === "N")
									html_string += "<img class=\"move-arrow\" src=\"./assets/arrow/"+ctrls_map[commands[c].charAt(m)]+".svg\">";
								else html_string += "<img class=\"move-arrow\" src=\"./assets/arrow/"+ctrls_map[commands[c].charAt(m)]+"p"+".svg\">";
							}
							else if(!isNaN(ctrls_map[commands[c].charAt(m)].charAt(0)))
								html_string += "<img class=\"move-button\" src=\"./assets/button/XBOX/"+ctrls_map[commands[c].charAt(m)]+".svg\">";
							else if( ctrls_map[commands[c].charAt(m)] === ">"){
								html_string += "<p class=\"move-hint\" style=\"color:#37ff05;font-size:20px;\"><i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i></p>";
							}
							else {
								 console.log("1. Not added: "+commands[c].charAt(m));
								 console.log("2. Not added map: "+ctrls_map[commands[c].charAt(m)]);
							}
						} catch (e) {
							if( commands[c].charAt(m) === "(" || commands[c].charAt(m) === ")")
								html_string += "<p class=\"move-hint\">"+commands[c].charAt(m)+"</p>";
							else{
								html_string += "<p class=\"move-hint\">"+commands[c].charAt(m)+"</p>";
							}
						}
					}
				}
			}
			
			// Hit Levels
			html_string += "</div><div class=\"move-hits\"><div class=\"move-hitlvlstring\">";
			for( let h=0; h<data.moves[i].at.length;h++){
				try{
				html_string += "<p class=\"mv-hitlvl hit"+hits_map[data.moves[i].at[h].l].toLowerCase()+"\">"
					+hits_map[data.moves[i].at[h].l]+""+(data.moves[i].at[h].t>0?" Throw":"")+"</p>";
				} catch(e){
					console.log(data.moves[i].at[h].l);
					console.log(hits_map[data.moves[i].at[h].l]);
					console.log("Fighter: "+index);
					console.log(data.moves[i].number);
					throw e;
				}
				if( h+1 < data.moves[i].at.length )
					html_string += "<i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i>";
			}

			// Breaks
			if(data.moves[i].br.length > 0){
				let breakt = "";
				switch (data.moves[i].br[0].b) {
			        case 1:
			            breakt = "1";
			            break;
			        case 2:
			            breakt = "2";
			            break;
			        case 3:
			            breakt = "1/2";
			            break;
			        case 4:
			            breakt = "1+2";
			            break;
			        default:
			            breakt = "";
			            break;
			    }
				html_string += "<i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i>";
				html_string += "<p class=\"mv-hitlvl\">"+data.moves[i].br[0].f + "F BREAK "+breakt+"</p>";
			}
			html_string += "</div><div class=\"move-hitamount\">"+data.moves[i].ds.length+(data.moves[i].ds.length>1?" Hits":" Hit")+"</div></div></div>";

			// extra section
			html_string += "<div class=\"move-extra\"><div class=\"mv-section\"><div class=\"move-special\">";

			// special effects
			if( data.moves[i].b8 )
				html_string += "<p class=\"spin\">SPIN</p>";
			if( data.moves[i].b9 )
				html_string += "<p class=\"armor\">ARMOR</p>";
			if( data.moves[i].bB )
				html_string += "<p class=\"track\">TRACK</p>";
			html_string +="</div>";

			// Move Frames
			// Start F
			html_string += "<table class=\"move-frames\">"+
				"<tr class=\"move-startf\"><td class=\"mv-id\">Start</td><td class=\"mv-frames\">"+
				data.moves[i].s+"F</td></tr>";
			// Block F
			html_string += "<tr class=\"move-blockf\"><td class=\"mv-id\">Block</td><td class=\"mv-frames negative\">"+data.moves[i].blk+"</td></tr>";
			// Hit Adv F
			html_string += "<tr class=\"move-hitf\"><td class=\"mv-id\">Hit</td>"+"<td class=\"mv-frames\">"
				+(data.moves[i].adv>0?"+"+data.moves[i].adv:data.moves[i].adv)+"</td></tr></table>";
			html_string += "</div>";
			// ----- mv section

			// Move Damage
			html_string += "<div class=\"move-dmg\"><p class=\"mv-frames\">"+data.moves[i].d+"</p><p class=\"mv-id\">Damage</p><div class=\"move-hitdmg\"><i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i>";
			for( let d=0; d<data.moves[i].ds.length; d++){
				html_string += data.moves[i].ds[d].d;
				if( d+1 < data.moves[i].ds.length )
					html_string += " + ";
			}
			html_string += "</div></div></div></td>";
			
			d3.select(".move-table").append("tr").html(html_string);
		}
	});
}