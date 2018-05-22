function Cell(i, j){
	this.i = i;
	this.j = j;
	this.walls = [true, true, true, true] //Top Right Bottom Left
	this.visited = false;

	this.checkNeighbors = function(){
		var neighbors = [];

		var top = grid[index(i, j - 1)];
		var right = grid[index(i + 1, j)];
		var bottom = grid[index(i, j + 1)];
		var left = grid[index(i - 1, j)];

		if(top && !top.visited){
			neighbors.push(top);
		}
		if(right && !right.visited){
			neighbors.push(right);
		}
		if(bottom && !bottom.visited){
			neighbors.push(bottom);
		}
		if(left && !left.visited){
			neighbors.push(left);
		}

		if(neighbors.length > 0){
			var r = floor(random(0, neighbors.length));
			return neighbors[r];
		} else {return undefined;}
	}

	this.show = function(){
		var x = this.i * w;
		var y = this.j * w;
		
		stroke(255);
		//Wall Generation if True
		if(this.walls[0]){//Top
			line(x, y, x + w, y); 
		}
		if(this.walls[1]){//Right
			line(x+w, y , x + w, y+w); 
		}
		if(this.walls[2]){//Bottom
			line(x+w, y+w, x, y+w);
		}
		if(this.walls[3]){//Left
			line(x, y+w , x, y);
		}
		if(this.visited){
			noStroke();
			fill(255, 0, 255, 100);
			rect(x, y, w, w);
		}
	}

	this.highlight = function(){
		var x = this.i * w;
		var y = this.j * w;

		noStroke();
		fill(0, 0, 255, 100);
		rect(x, y, w, w);
	}

	this.highlightOff = function(){
		var x = this.i * w;
		var y = this.j * w;
		noStroke();
		fill(255, 0, 255, 100);
		rect(x, y, w, w);
	}
}

function removeWalls(a, b){
	var x = a.i - b.i;
	if(x == 1){
		a.walls[3] = false;
		b.walls[1] = false;
	} else if(x == -1){
		a.walls[1] = false;
		b.walls[3] = false;
	}

	var y = a.j - b.j;
	if(y == 1){
		a.walls[0] = false;
		b.walls[2] = false;
	} else if(y == -1){
		a.walls[2] = false;
		b.walls[0] = false;
	}
}