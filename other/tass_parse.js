const fs = require('fs');


/** vars **/
const data_dir = "./../assets/data/";
const ta_moves_dir = data_dir + "movelists/";
const char_data = JSON.parse(fs.readFileSync(data_dir + "map_chars.json", "utf8"));
const hex2cmd_index = JSON.parse(fs.readFileSync(data_dir + "map_ctrls.json", "utf8"));
const hit_property_index = JSON.parse(fs.readFileSync(data_dir + "map_hits.json", "utf8"));
const write_dir = "./ta_fd/";

let movelists = fs.readdirSync(ta_moves_dir);
let chars = [];

function isLetter(c) {
  return c.toLowerCase() != c.toUpperCase();
}

function get_char(id){
	return char_data.find(function(elem){
		return parseInt(elem.i) === id;
	});
}

function get_HPI(index){
	return hit_property_index.find(function(elem){
		return elem.i === index;
	});
}

for( let f=0; f<movelists.length; f++){
	fs.readFile(ta_moves_dir+movelists[f], 'utf8', (err, data) => {
		let info = JSON.parse(data);
		console.log(info.id + ' --- ' + info.name);
		let name = get_char(info.id);

		if(!name)
			return;

		let char_info = {
			id: parseInt(name.i),
			id_name: name.c_index,
			name: name.n,
			first_name: name.n.split(" ")[0],
			last_name: name.n.split(" ").length > 1 ? name.n.split(" ")[1]:"",
			n_moves: 0,
			moves: []
		};

		for( let m=0; m<info.moves.length; m++){
			// Check for Valid Move (Not a title)
			if(!info.moves[m].number>0){
				continue;
			}

			let move = {
				id: info.moves[m].i,
				number: info.moves[m].number,
				name: info.moves[m].name[1],
				command: [],
				command_string: undefined,
				n_hits: info.moves[m].ds.length,
				hit_levels: [],
				damage: 0,
				damage_per_hit: undefined,
				special_props: [],
				throw_break: undefined,
				frames: {
					startup: 0,
					speed_per_hit: undefined,
					block: 0,
					hit: 0,
					counter_hit: 0					
				}
			}

			// ** Move String
			let commands = info.moves[m].command[1].split(" ");
			move.command_string = "";
			for( let c=0; c<commands.length;c++){
				if(/[a-z]/.test(commands[c].toLowerCase())){
					move.command_string += commands[c] + " ";
					move.command.push(commands[c]);
				} else {
					let x;
					function last(){
						return (x+1) === commands[c].length && (c+1) >= commands.length;
					}
					for(x=0; x<commands[c].length; x++){
						try{
							if( isLetter(hex2cmd_index[commands[c].charAt(x)])){
								if(	hex2cmd_index[commands[c].charAt(x)] === hex2cmd_index[commands[c].charAt(x)].toLowerCase() || hex2cmd_index[commands[c].charAt(x)] === "N"){
									move.command_string += hex2cmd_index[commands[c].charAt(x)].toLowerCase()+String(last()?"":", ");
									move.command.push(hex2cmd_index[commands[c].charAt(x)].toLowerCase());
								}
								else{
									move.command_string += hex2cmd_index[commands[c].charAt(x)].toUpperCase()+String(last()?"":", ");
									move.command.push(hex2cmd_index[commands[c].charAt(x)].toUpperCase());
								}
							}
							else if(!isNaN(hex2cmd_index[commands[c].charAt(x)].charAt(0))){
								move.command_string += hex2cmd_index[commands[c].charAt(x)] +String(last()?"":", ");
								move.command.push(hex2cmd_index[commands[c].charAt(x)]);
							}
							else if( hex2cmd_index[commands[c].charAt(x)] === ">"){
								move.command_string += ">, ";
								move.command.push(">");
							}
						} catch (e) {
							if( commands[c].charAt(x) === "(" || commands[c].charAt(x) === ")") {
								move.command_string += commands[c].charAt(x) + String(last()?"":" ");
								move.command.push(commands[c].charAt(x));
							}
							else{
								move.command_string += commands[c].charAt(x) + String(last()?"":" ");
								move.command.push(commands[c].charAt(x));
							}
						}
					}
				}
			}

			// ** Hitbox Level Per Hit
			for( let h=0; h<info.moves[m].at.length;h++){
				move.hit_levels.push(get_HPI(info.moves[m].at[h].l).h+""+(info.moves[m].at[h].t>0?" Throw":""));
			}

			// ** Throw Break (if Throw Move)
			if(info.moves[m].br.length > 0){
				let breakt = "";
				switch (info.moves[m].br[0].b) {
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
			    move.throw_break = "";
				move.throw_break = info.moves[m].br[0].f + "F BREAK "+breakt;
			}

			// ** Damage
			move.damage = info.moves[m].d;
			// Damage Per Hit
			move.damage_per_hit = "";
			for( let d=0; d<info.moves[m].ds.length; d++){
				move.damage_per_hit += String(info.moves[m].ds[d].d);
				if( d+1 < info.moves[m].ds.length )
					move.damage_per_hit += "+";
			}

			// ** Special Properties
			if( info.moves[m].b9 ) move.special_props.push("spin");
			if( info.moves[m].b8 ) move.special_props.push("armor");
			if( info.moves[m].bB ) move.special_props.push("track");

			// ** Move Frames
			// Start
			move.frames.startup = info.moves[m].s;
			// Speed Per Hit
			move.frames.speed_per_hit = "";
			for(var sfs=1; sfs<info.moves[m].ss.length; sfs++){
				move.frames.speed_per_hit += info.moves[m].ss[sfs].s;
				if( sfs+1 < info.moves[m].ss.length )
					move.frames.speed_per_hit += "+";
			}
			// Block
			move.frames.block = info.moves[m].blk;
			// Hit
			move.frames.hit = info.moves[m].adv;

			char_info.moves.push(move);
			char_info.n_moves++;
		}

		fs.writeFileSync(write_dir+name.i+"_"+char_info.id_name+'.json', JSON.stringify(char_info, null, 4), 'utf8');
	});
}