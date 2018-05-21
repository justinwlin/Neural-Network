var vehicles=[];
var food = [];
var poison = [];
function setup() {
  createCanvas(640, 360);
	//Vehicles
	for(var i = 0; i < 10; ++i){
		var x = random(width);
		var y = random(height);
		vehicles[i] = new Vehicle(x, y);
	}
	//Food
	for(var i = 0; i < 100; ++i){
		var x = random(width);
		var y = random(height);
		food.push(createVector(x, y));
	}
	//Poison
	for(var i = 0; i < 30; ++i){
		var x = random(width);
		var y = random(height);
		poison.push(createVector(x, y));
	}
}

function draw() {
	background(51);
	if(random(1) < 0.05){
		var x = random(width);
		var y = random(height);
		food.push(createVector(x, y));
	}
	for(var i = 0; i < food.length; i++){
		fill(0, 255, 0);
		noStroke();
		ellipse(food[i].x, food[i].y, 8, 8);
	}
	for(var i = 0; i < poison.length; i++){
		fill(255, 0, 0);
		noStroke();
		ellipse(poison[i].x, poison[i].y, 8, 8);
	}
	for(var i = vehicles.length - 1; i >= 0; --i){
		vehicles[i].boundaries();
		vehicles[i].behavior(food, poison); 
		vehicles[i].update();
		vehicles[i].display();

		if(vehicles[i].dead()){
			vehicles.splice(i, 1);
		}
	}	
}