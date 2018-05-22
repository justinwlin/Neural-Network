/*
======================
Grid Variables
======================
*/

var cols, rows;
var w = 40;
var grid = [];
var stack = [];
var current;

var debug;

/*
======================
Seeker Variables
======================
*/
var generations = 0;

var numSeekers = 700;
seekerMode = false;
seekers = [];
finishedSeekers = [];

/*
========================
Initialization Function
========================
*/
function setup() {
	createCanvas(400, 400);
	cols = floor(width / w);
	rows = floor(height / w);
	for(var j = 0; j < rows; j++){
		for(var i = 0; i < cols;i++){
			var cell = new Cell(i, j);
			grid.push(cell);
		}
	}

	for(i = 0; i < numSeekers; i++){
		seekers.push(new seeker(0, 0));
	}
	current = grid[0]; 
}


/*
=========================
Update Loop
=========================
*/
function draw() {
	let sum = 0;
	background(51);
	for (var i = 0; i < grid.length; ++i){
		grid[i].show();
	}
	if(!seekerMode){
		current.visited = true;
		current.highlight();
		var next = current.checkNeighbors();
		if(next){
			next.visited = true;
			stack.push(current);
			removeWalls(current,next);
			current = next;
		}
		else if(stack.length > 0){
			current = stack.pop();
		}
		else{
			seekerMode = true;
		}
	}
	else if(seekers.length > 0){
		current.highlightOff();
		for(i = seekers.length - 1; i >= 0; i--){
			seekers[i].moveMe();
			finishedSeekers.push(seekers[i]);
			seekers.pop();
		}
		for(i = finishedSeekers.length - 1; i >= 0; i--){
			sum += finishedSeekers[i].fitness;
		}
		for(i = finishedSeekers.length - 1; i >= 0; i--){
			finishedSeekers[i].fitness / sum;
		}


		// console.log(finishedSeekers);
		// throw(finishedSeekers);
	}
	else{
		// if(generations == 100){
		// 	console.log(finishedSeekers);
		// 	throw("stop");	
		// }
		for(i = finishedSeekers.length - 1; i >= 0; i--){
			finishedSeekers[i].highlightSeeker();
			pickedSeeker= createNewSeekers(finishedSeekers);
			pickedSeeker = new seeker(0, 0, pickedSeeker.dna);

			seekers.push(pickedSeeker);
		}
		breed(seekers);
		finishedSeekers = [];
		generations += 1;

		console.log(generations);
	}
}

function breed(list){
	for(i = 0; i < list.length; i++){
		randomIndex = floor(random(list.length - 1));
		randomIndex2 = floor(random(list.length - 1));
	
		list[randomIndex].dna[randomIndex] = list[randomIndex2].dna[randomIndex2];
	}

}

function createNewSeekers(list){
	var index = -1;
	var r = random(1);
	while (r > 0) {
		index++;
		r = r - list[index].prob;
	}
	return list[index];
}

function index(i, j){
	if(i < 0 || j < 0 || i > cols - 1 || j > rows - 1){
		return -1;
	}
	return i + j * cols;
}
