/*!
 * =============================
 * =	Mike Pinto             =
 * =	mspkvp@github.com      =
 * =	©2017 tk7movespretty   =
 * ============================= */

'use strict';

var char_data = [], 
	ctrls_map,
	hits_map = [];
	
/** States **/
var selected_char = "32",
	lang = 1,
	lang_index = 0,
	jap = false,
	prefDialog = false,
	charMenuDialog = false,
	button_layouts = ["STEAM", "PS4","XBOX"],
	bl_choice = 2;

function getCookie(){
	if(typeof Cookies.get('tk7moves') != 'undefined'){
		d3.select("#platf-select > option:nth-child("+(bl_choice+1)+")").attr("selected",false);
		d3.select("#lang-select > option:nth-child("+(lang_index+1)+")").attr("selected",false);
		
		var vals = JSON.parse(Cookies.get('tk7moves'));
		selected_char = vals.selected_char;
		lang = vals.lang;
		lang_index = vals.lang_index;
		jap = vals.jap;
		bl_choice = vals.bl_choice;

		d3.select("#platf-select > option:nth-child("+(bl_choice+1)+")").attr("selected",true);
		d3.select("#lang-select > option:nth-child("+(lang_index+1)+")").attr("selected",true);
	}
	else {
		setCookie();
	}
}

function setCookie(){
	Cookies.set('tk7moves',JSON.stringify({
		selected_char: selected_char,
		lang: lang,
		lang_index: lang_index,
		jap: jap,
		bl_choice: bl_choice
	}), { expires: 30, path: '' });
}

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

function toHexArr(str) {
	var result = [];
	for (var i=0; i<str.length; i++) {
	  result.push("\\u"+str.charCodeAt(i).toString(16));
	}
	return result;
}

function setLang(val){
	lang = parseInt(val);

	if(lang === 0)
		jap = true;
	else jap = false;
	
	d3.select("#lang-select").selectAll("option").each(function(){
		if(parseInt(this.value) === lang){
			lang_index = this.index;
		}
	});
	setCookie();
	fetchmovelist(selected_char);
}

function selectChar(index){
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
	setCookie();

	if(charMenuDialog) toggleCharMenu();
}

var togglePreferences = function() {
	if(prefDialog) 
		d3.select("#preferences").style('visibility', 'hidden');
	else d3.select("#preferences").style('visibility', 'visible');

	prefDialog = !prefDialog;
};

var toggleCharMenu = function(){
	if(charMenuDialog) 
		d3.select("#charmenu").style('display', 'none');
	else d3.select("#charmenu").style('display', 'initial');

	charMenuDialog = !charMenuDialog;
};

var changePlatform = function(index){
	bl_choice = index;
	setCookie();
	fetchmovelist(selected_char);
};

var importdata = function importdata(){
	getCookie();
	d3.json("./assets/data/map_hits.json", function(err, data) {
		for(var h in data)
			hits_map[data[h].i] = data[h].h;
		d3.json("./assets/data/map_ctrls.json", function(err, data) {
			ctrls_map = data;

			d3.json("./assets/data/map_chars.json", function(err, data) {
				for(var h in data)
					char_data[data[h].i] = {c: data[h].c, n: data[h].n};

				for(let i=0; i<data.length; i++){
					var tname = data[i].c_index.split(" ");
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
		});
	});
};

var fetchmovelist = function fetchmovelist(index) {
	d3.json("./assets/data/movelists/MOVELIST_"+index+".json", function(err, data) {
		
		selectChar(index);

		var mov_count = 0;
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
			mov_count++;
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
								html_string += "<img class=\"move-button\" src=\"./assets/button/"+button_layouts[bl_choice]+"/"+ctrls_map[commands[c].charAt(m)]+".svg\">";
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
			html_string += "<div class=\"move-dmg\"><p class=\"mv-frames\">"+data.moves[i].d+"</p><p class=\"mv-id\">Damage</p><div class=\"move-hitdmg-section\"><i id=\"dmgmove"+data.moves[i].number+"\" class=\"fa fa-plus-square\" aria-hidden=\"true\"></i><div class=\"move-hitdmg\">";
			for( let d=0; d<data.moves[i].ds.length; d++){
				html_string += data.moves[i].ds[d].d;
				if( d+1 < data.moves[i].ds.length )
					html_string += "+";
			}
			html_string += "</div></div></div></div></div>";

			// extra section
			html_string += "<div class=\"move-extra\"><div class=\"mv-section\"><div class=\"move-special\">";

			// special effects
			if( data.moves[i].b9 )
				html_string += "<p class=\"spin\">SPIN</p>";
			if( data.moves[i].b8 )
				html_string += "<p class=\"armor\">ARMOR</p>";
			if( data.moves[i].bB )
				html_string += "<p class=\"track\">TRACK</p>";
			html_string +="</div>";

			// Move Frames
			// Start F
			html_string += "<table class=\"move-frames\">"+
				"<tr class=\"move-startf\"><td class=\"mv-id\">Start</td><td class=\"mv-frames\">"+
				data.moves[i].s+"F</td></tr>";
			//Start Frames Segmented
			if(data.moves[i].s > 0 ){
				html_string += "<tr class=\"move-startf-seg\"><td>"+data.moves[i].s+"F = ";
				for(var sfs=1; sfs<data.moves[i].ss.length; sfs++){
					html_string += data.moves[i].ss[sfs].s;
					if( sfs+1 < data.moves[i].ss.length )
						html_string += "+";
				}
				html_string +="</td></tr>";
			}
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

		for(var m=1; m<=mov_count; m++){
			var moveid = m;
			d3.select("#dmgmove"+moveid).on("mouseenter", function(){d3.select("i#"+this.id+" + div.move-hitdmg").style('display', 'initial');});
			d3.select("#dmgmove"+m).on("mouseleave", function(){var tid=this.id; setTimeout(function(){d3.select("i#"+tid+" + div.move-hitdmg").style('display', 'none');}, 3000);});
		}

		// Scroll the list to the top
		document.querySelector("#movelist_tab > table ").firstElementChild.scrollIntoView(true);
	});
};
