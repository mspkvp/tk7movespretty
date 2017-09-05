const fs = require('fs');
const parseString = require('xml2js').parseString;

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function isLetterString(arg) {
	if(arg.length < 3)
		return false;

	for(let l in arg){
		if(!/[a-zA-Z(),]/.test(arg.charAt(l)))
			return false;
	}
	return true;
}

function isMoveInput(arg) {
	if(arg.length === 1)
		return true;
	else if( arg.indexOf("+") != -1 || arg.indexOf("/") != -1)
		return true;
	else if(!isNaN(arg))
		return true;
	//else if( arg.indexOf("*") != -1)

	return false;
}

function splitMove(move_string) {
	let spc_split = move_string.split(" ").map((item) => item.trim());
	let comma_split = [];

	spc_split.forEach(function(arg){
		if(isLetterString(arg))
			comma_split = comma_split.concat(arg);
		else comma_split = comma_split.concat(arg.split(",").map((item) => item.trim()));
	});

	return comma_split.filter(function(e){return e});
}

let read_dir = './rbn_fd/html/';
let write_dir = './rbn_fd/json/';
let files = fs.readdirSync(read_dir);
let char_data_pms = new Promise(function(resolve, reject){
	fs.readFile("./../assets/data/map_chars.json", (err, data) => {
		if (err) reject(err);

		let char_data_raw = JSON.parse(data), char_data = {};
		for(let c in char_data_raw){
			let names = char_data_raw[c].n.split(' ');
			char_data[char_data_raw[c].c_index] = {id_s: char_data_raw[c].i,id: parseInt(char_data_raw[c].i), first_name: toTitleCase(names[0]), last_name: names.length>1?toTitleCase(names[1]):"", title: char_data_raw[c].c.split(" ")[0].toLowerCase()};
		}
		resolve(char_data);
	});
});

function process_move_command(move_string) {
	console.log("Start --> "+move_string);
	let splits = splitMove(move_string);
	let words = [],
		inputs = [];
	console.log(splits);
	return;
	for(let i=0; i<splits.length; i++)
		if(isLetterString(splits[i]))
			words.push(splits[i]);
		else if( isMoveInput(splits[i]) )
			inputs.push(splits[i]); 
		else console.log("---- split: "+ ssplits[i]+" | length: "+splits[i].length);

	console.log({
		split: splits,
		words: words,
		inputs: inputs
	});
	console.log("==========");
}

Promise.all([char_data_pms]).then(function(values){
	//console.log(values);
	//console.log(files);
	const char_data = values[0];
	
	for(let f=2; f<files.length; f++){
		console.log(read_dir+files[f]);
		let xml_string = fs.readFileSync(read_dir+files[f], 'utf8');
		parseString(xml_string, function (err, result) {
			// Table Headers
			let fields = [];
			let fields_raw = result.div.table[0].tr[0].td;

			for(let i=0; i<fields_raw.length; i++){
				if(typeof(fields_raw[i]) != "string")
					fields.push(fields_raw[i].b[0]);
				else fields.push(fields_raw[i]);
			}

			// Moves
			let moves = {special:[],basic:[]};
			let movelist_special = result.div.table[0].tr;
			let movelist_basic = result.div.table[1].tr;
			let move_counter = 0;

			function process_move(array_src, array_dest) {
				for(let i=1; i<array_src.length; i++){
					let move = {id: move_counter, number: ++move_counter};
					for( let j=0; j<array_src[i].td.length; j++){
						if( fields[j] === "Command" ){
							console.log("move id: "+move.id);
							process_move_command(array_src[i].td[j]);
						}
						move[fields[j]] = array_src[i].td[j];
					}
					array_dest.push(move);
				}
			}

			process_move(movelist_special, moves.special);
			process_move(movelist_basic, moves.basic);

			// Character File Setup
			let char_key = files[f].split("_")[0];
			let char = {
				id: char_data[char_key].id,
				name: char_data[char_key].first_name + ' ' + char_data[char_key].last_name,
				first_name: char_data[char_key].first_name,
				last_name: char_data[char_key].last_name,
				n_moves: move_counter,
				moves: moves
			}
			fs.writeFileSync(write_dir+char_data[char_key].id_s+"_"+char_data[char_key].title+'.json', JSON.stringify(char, null, 4), 'utf8');
		});
		break;
	}
});
