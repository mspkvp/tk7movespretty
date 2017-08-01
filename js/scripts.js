/* ==========================================
 * =	Mike Pinto							=
 * =	mspkvp@github.com					=
 * =	©2017 tk7movespretty				=
 * ========================================== */

'use strict';

var char_data = [], 
	ctrls_map,
	hits_map = [],
	selected_char = "32",
	lang = 1,
	jap = false;

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

    return result;
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

function setLang(index){
	lang = index;

	if(index === 0)
		jap = true;
	else jap = false;

	var id_string = char_data[selected_char].c.split(" ");
	d3.select("#"+id_string[0]).classed("selected", true);
	d3.select("#selected-title").text(char_data[selected_char].n);
	fetchmovelist(selected_char);
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
					var tname = data[i].c.split(" ");
					if(data[i].i == "11")
						tname = data[i].c.split("-");
					d3.select(".char-menu > .inner-table > table").append("tr")
						.html("<td class=\"char-card\" id=\""+data[i].c.split(" ")[0]+"\"><img src=\"./assets/chars/"+tname.join("").toLowerCase()+"_thumbnail.png\"><p>"+data[i].c+"</p></td>");
					d3.select("#"+data[i].c.split(" ")[0]).on("click", function(){fetchmovelist(data[i].i)});
				}
				var id_string = char_data[selected_char].c.split(" ");
				d3.select("#"+id_string[0]).classed("selected", true);
				d3.select("#selected-title").text(char_data[selected_char].n);
				fetchmovelist(selected_char);
			});

			d3.select("#lang0").on("click", function(){setLang(0);});
			d3.select("#lang1").on("click", function(){setLang(1);});
			d3.select("#lang3").on("click", function(){setLang(3);});
			d3.select("#lang4").on("click", function(){setLang(4);});
			d3.select("#lang5").on("click", function(){setLang(5);});
			d3.select("#lang6").on("click", function(){setLang(6);});
			d3.select("#lang7").on("click", function(){setLang(7);});
			d3.select("#lang8").on("click", function(){setLang(8);});
			d3.select("#lang9").on("click", function(){setLang(9);});
			d3.select("#lang10").on("click", function(){setLang(10);});
			d3.select("#lang11").on("click", function(){setLang(11);});
		});
	});
}

var fetchmovelist = function fetchmovelist(index) {
  	function toHexArr(str) {
	    var result = [];
	    for (var i=0; i<str.length; i++) {
	      result.push("\\u"+str.charCodeAt(i).toString(16));
	    }
	    return result;
  	}

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
		d3.select("#selected-title").text(char_data[selected_char].n);
		for(let i=0; i<data.moves.length; i++){
			// Number + Move Name
			// Special 
			if(!data.moves[i].number>0){
				let html_string = "<td class=\"move-card\"><div class=\"move-info\"><div class=\"move-number\">&#9733;</div>"+
					"<div class=\"move-title\"><div class=\"move-name\" style=\"margin-bottom:5px;\">"+data.moves[i].name[jap?0:1]+"</div>"+
					"</div></div></td>";
				d3.select(".move-table").append("tr").html(html_string);
				continue;
			}

			var html_string = "<td class=\"move-card\"><div class=\"move-info\"><div class=\"move-number\">"+data.moves[i].number+"</div>"+
			"<div class=\"move-title\"><div class=\"move-name\">"+data.moves[i].name[jap?0:1]+"</div>"+
			"<div class=\"move-hitamount\">"+data.moves[i].ds.length+(data.moves[i].ds.length>1?" Hits":" Hit")+"</div></div>";
			
			// Move String
			html_string += "<div class=\"move-string\">";
			let commands = data.moves[i].command[lang].split(" ");
			for( let c=0; c<commands.length;c++){
				if(/[a-z]/.test(commands[c].toLowerCase()))
					html_string += "<p class=\"move-hint\">"+commands[c]+"</p>";
				else {
					for( let m=0; m<commands[c].length; m++){
						try{
							if( isLetter(ctrls_map[commands[c].charAt(m)])){
								if(	ctrls_map[commands[c].charAt(m)] === ctrls_map[commands[c].charAt(m)].toLowerCase() || ctrls_map[commands[c].charAt(m)] === "N")
									html_string += "<img class=\"move-arrow\" src=\"./assets/arrow/"+ctrls_map[commands[c].charAt(m)].toLowerCase()+".svg\">";
								else html_string += "<img class=\"move-arrow\" src=\"./assets/arrow/"+ctrls_map[commands[c].charAt(m)].toLowerCase()+"p"+".svg\">";
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
			html_string += "</div><div class=\"move-hit-dmg\"><div class=\"move-hitlvlstring\">";
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
			html_string += "</div>";
			// Move Damage
			html_string += "<div class=\"move-dmg\"><p class=\"mv-frames\">"+data.moves[i].d+"</p><p class=\"mv-id\">Damage</p><i class=\"fa fa-plus-square move-hitdmg-tooltip\" aria-hidden=\"true\"></i><div class=\"move-hitdmg\">";
			for( let d=0; d<data.moves[i].ds.length; d++){
				html_string += data.moves[i].ds[d].d;
				if( d+1 < data.moves[i].ds.length )
					html_string += " + ";
			}
			html_string += "</div></div></div></div>";

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
			html_string += "<tr class=\"move-blockf\"><td class=\"mv-id\">Block</td><td class=\"mv-frames "+(data.moves[i].blk>-1?"blkpositive\">+":data.moves[i].blk<-10?"blknegative\">":"blkmild\">")+data.moves[i].blk+"</td></tr>";
			// Hit Adv F
			html_string += "<tr class=\"move-hitf\"><td class=\"mv-id\">Hit</td>"+"<td class=\"mv-frames\">"
				+(data.moves[i].adv>0?"+"+data.moves[i].adv:data.moves[i].adv)+"</td></tr></table>";
			html_string += "</div>";
			// ----- mv section

			html_string += "</div></td>";

			d3.select(".move-table").append("tr").html(html_string);
		}
	});
}