/* Initialize the Game */

//Data source: https://gawron.sdsu.edu/crypto/lectures/hiragana.html
// I have removed the probabilities for (n, o, v) as they are not hiragana.

//TODO: coalesce weights of un-dakuten/maru'ed kana into same class.
// TODO: Also do the same with "small" kana
// TODO: Also work out a way to modularize this app (pull in deps from other js files).

let table = {
  "う": 0.073907,
  "い": 0.066484,
  "し": 0.040915,
  "き": 0.031462,
  "に": 0.030106,
  "か": 0.029626,
  "ょ": 0.029277,
  "の": 0.027069,
  "ち": 0.026263,
  "く": 0.025535,
  "と": 0.025279,
  "は": 0.021296,
  "た": 0.020157,
  "ゅ": 0.017647,
  "こ": 0.017515,
  "て": 0.017004,
  "さ": 0.016562,
  "つ": 0.015702,
  "な": 0.015462,
  "せ": 0.014067,
  "じ": 0.013827,
  "が": 0.013742,
  "る": 0.013649,
  "ろ": 0.012913,
  "り": 0.012262,
  "け": 0.011061,
  "を": 0.011014,
  "ど": 0.010402,
  "っ": 0.010286,
  "よ": 0.010232,
  "ぜ": 0.010139,
  "で": 0.009697,
  "お": 0.008829,
  "ら": 0.008434,
  "ご": 0.007954,
  "す": 0.007768,
  "あ": 0.007744,
  "も": 0.007613,
  "だ": 0.007597,
  "め": 0.006962,
  "ま": 0.006853,
  "れ": 0.006768,
  "え": 0.006567,
  "ぎ": 0.005908,
  "ひ": 0.005862,
  "ほ": 0.005288,
  "み": 0.005273,
  "そ": 0.005249,
  "ね": 0.004676,
  "げ": 0.004413,
  "ゃ": 0.004389,
  "わ": 0.004366,
  "ふ": 0.004227,
  "ぶ": 0.004219,
  "や": 0.003630,
  "ン": 0.003607,
  "ば": 0.002747,
  "ぱ": 0.002708,
  "ル": 0.002406,
  "ス": 0.002274,
  "べ": 0.002135,
  "む": 0.002057,
  "ざ": 0.002057,
  "ト": 0.002049,
  "び": 0.002003,
  "イ": 0.001879,
  "へ": 0.001747,
  "ゆ": 0.001716,
  "ぽ": 0.001709,
  "ぞ": 0.001654,
  "ぼ": 0.001468,
  "ラ": 0.001383,
  "フ": 0.001352,
  "ク": 0.001329,
  "ド": 0.001220,
  "ず": 0.001120,
  "リ": 0.001019,
  "ぐ": 0.000996,
  "レ": 0.000941,
  "づ": 0.000879,
  "ッ": 0.000732,
  "ぴ": 0.000717,
}

//TODO: refactor this into a class, e.g. js adaptation of https://github.com/sciurolocutus/WeightedRandomList
/**
 * Given a table of letters onto their relative
*/
let weightedRandom = function(tbl) {
  let sumWeights = 0.0;
  reverseTbl = {};
  for (var el in tbl) {
    if (tbl.hasOwnProperty(el)) {
      sumWeights += parseFloat(tbl[el]||0);
      //Populate the reverse table.
      reverseTbl[tbl[el]] = el;
    }
  }

  //console.log("Total weight: " + sumWeights);

  let target = Math.random() * sumWeights;
  //console.log("Target number: " + target);

  let hi = 0.0; // track how far we've "travelled"
  let index = 0;
  for (var weight of Object.values(tbl)) {
    //console.log("Considering " + Object.keys(tbl)[index] + "with weight " + weight);
    hi += weight;
    if (hi > target) {
      return Object.keys(tbl)[index];
    }
    index++;
  }

  return Object.keys(tbl)[Object.keys(tbl).length - 1];

}

let randomHiragana = function() {
  return weightedRandom(table);
}

list =
	[...new Array(25)].map(a =>
		[...new Array(6)].reduce((prev, curr, idx, arr) => prev + randomHiragana(), "")
	);

var board_generator = []; //2-dimensional array for storing original dice information
var current_track = []; // keep track of visited dice in selected order
var clickable = []; // those clickable dice
var submitted = new Set(); // store submitted words

board_generate();
board();
button_event();


/* Functions for generating the board */
function board(){//generate a random 5*5 size board
	var board = []; // For storing the 5*5 size of board
	var board_temp = [];
	var dice_arr = [];
	var upside;
	var row;
	var character='';
	shuffle(board_generator);
	//console.log(board_generator);
	for(let i=0;i<board_generator.length;i++){
		dice_arr = board_generator[i];
		upside = random_face(dice_arr);
		if(upside==='Q')upside = 'Qu';
		board_temp.push(upside);
	}
	for(let i=0;i<board_temp.length;i=i+5){
		line = [];
		line.push(board_temp[i]);
		line.push(board_temp[i+1]);
		line.push(board_temp[i+2]);
		line.push(board_temp[i+3]);
		line.push(board_temp[i+4]);
		board.push(line);
	}
	//console.log(board);

	//render board on HTML
	for(var row=0;row<5;row++){
		for(var col=0;col<5;col++){
			character = board[row][col];
			var button = "<button type='button' class='btn dice'"+"row="+row+" col="+col+">"+ character + "</button>";
			var row_selector = document.getElementById("row"+row);
			row_selector.innerHTML += button;
		}
	}

}

function board_generate(){
	var dice;
	for(let i=0;i<list.length;i++){
		dice = list[i].toUpperCase().split('');
		board_generator.push(dice);
	}
	//console.log(board_generator);
}

function shuffle(arr){//function to shuffle the dice
	var j,temp;
	for(let i=arr.length;i>0;i--){
		j=Math.floor(Math.random()*i);
		temp = arr[i-1];
		arr[i-1] = arr[j];
		arr[j] = temp;
	}
}

function random_face(arr){//random a upside face from a dice
	var index = Math.floor(Math.random()*6);
	var upside_face = arr[index];
	return upside_face;
}


/* Functions for the gameplay */
function button_event(){
	var row,col,text;
	var events = document.getElementsByClassName('dice');
	for(let event of events){
		event.onclick = function(){
			row = Number(event.getAttribute('row'));
			col = Number(event.getAttribute('col'));
			text = event.innerHTML;
			if(!event.classList.contains('active')){
				current_track.push([row,col]);
				current_word += text;
			}else{
				current_track.pop();
				current_word = current_word.substring(0,current_word.length-1);
			}
			if(current_track.length !== 0){
				var current_dice = current_track[current_track.length-1];
				console.log(current_dice);
				//console.log('current_track'+current_track);
				ajacent(current_dice[0],current_dice[1]);
				//console.log('clickable'+clickable);
				clickable = modify_clickable(clickable,current_track);
				clickable.push([current_dice[0],current_dice[1]]);
				//console.log('difference'+clickable);
			}
			update_clickable_dice();
			document.getElementById('current_word').innerHTML = current_word;
			event.classList.toggle('active');
		}
	}
	document.getElementById('submit').onclick = function(){
		submit_word();
		after_submit();
	};
}

function modify_clickable(clickable,current_track){//remove all elements in array clickable contained in array current_track
	var dice1 = [];
	var dice2 = [];
	var difference = clickable.slice();//make a copy of clickable array
	for(let i=clickable.length-1;i>=0;i--){
		for(let j=0;j<current_track.length;j++){
			var dice1 = clickable[i];
			var dice2 = current_track[j];
			//console.log(dice1);
			//console.log(dice2);
			if( dice1[0] === dice2[0] && dice1[1] === dice2[1] ){
					difference.splice(i,1);
			}
		}
	}
	//console.log(difference);
	return difference;
}

function update_clickable_dice(){
	var events = document.getElementsByClassName('dice');
	var found = false;
	if(current_track.length === 0 ){
		for(let event of events){
			event.disabled = false;
			event.classList.remove('highlight_btn');
		}
	}else{
		for(let event of events){
			event.disabled = true;
			event.classList.remove('highlight_btn');
			found = false;
			row = Number(event.getAttribute('row'));
			col = Number(event.getAttribute('col'));
			for(let dice of clickable){
				if(dice[0] === row && dice[1] === col){
					found = true; //find the dice
				}
			}
			if(found){
				event.disabled = false;
				event.classList.add('highlight_btn');
			}
		}
	}

}

var current_word = ""; //show current word
var err_msg = ""; // show error message
function submit_word(){
	if(current_word===""){
		err_msg = "You need to select a word before submitting!";
		document.getElementById('error').innerHTML = err_msg;
	}else{
		current_track = [];//reset current_track
		submitted.add(current_word);
		current_word = "";
		document.getElementById('current_word').innerHTML = current_word;
		update_words();
		document.getElementById('error').innerHTML = '';
	}
}

function after_submit(){
	var events = document.getElementsByClassName('dice');
	for(let event of events){
		event.classList.remove('active');
	}
	current_track = [];
	update_clickable_dice();
}

function update_words(){
	var score;
	var sum = 0;
	document.getElementById('table_words').innerHTML = "";
	for(let word of submitted){
		score = calculate_score(word);
		sum += score;
		document.getElementById('table_words').innerHTML += "<div><span>"+word+"</span>"+"<span>"+score+"</span></div>";
	}
	document.getElementById('total-score').innerHTML = sum;
}

function calculate_score(word){
	switch(word.length){
		case 1:
		case 2:
			return 0;
		case 3:
		case 4:
			return 1;
		case 5:
			return 2;
		case 6:
			return 3;
		case 7:
			return 5;
		default:
			return 11;
	}
}

function within_range(row,col){
	return(row>=0 && row<5 && col>=0 && col<5);
}

var ajacent_dice = [
[-1,-1],[-1,0],[-1,1],
[0,-1],			[0,1],
[1,-1],	[1,0],	[1,1]
];
function ajacent(row,col){
	clickable = [];
	var newrow,newcol;
	for(let neighbor of ajacent_dice){
		newrow = Number(row)+neighbor[0];
		newcol = Number(col)+neighbor[1];
		//console.log(newrow);
		if(within_range(newrow,newcol)){
			//this dice can be selected
			clickable.push([newrow,newcol]);
		}
	}
}
