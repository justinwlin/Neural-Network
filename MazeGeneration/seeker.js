
var directions = ["UP", "RIGHT", "DOWN", "LEFT"];
success = [];

function seeker(i, j, dna){
    this.i = i;
    this.j = j;

	this.moves = 40;
    this.dna = [];	
    this.fitness = 0;
    this.penalty = 0;

    /*
    ==================
    Mutation
    ==================
    */
    if (dna == null){
        for (i = 0; i < this.moves; i++){
            this.dna.push(directions[floor(random(0, 4))]);
        }
    }
    else{
        this.dna = dna;
        if(random(1) < 0.05){ //<-- Mutation Rate
            this.dna[floor(random(this.dna.length - 1))] = directions[floor(random(0, 4))];
        }
    }


    seeker.prototype.moveMe = function(){
        for(i = this.moves - 1; i >= 0; i--){
            //UP
            if(this.dna[i] == directions[0] && this.j != 0){
                if(grid[index(this.i, this.j - 1)] != null && grid[index(this.i, this.j - 1)].walls[2] == false){
                    this.j -= 1;
                    this.highlightSeeker();
                }
                else{
                    this.penalty += 1;
                }
            }

            else if(this.dna[i] == directions[1] && this.i < cols){
                if(grid[index(this.i + 1, this.j)] != null && grid[index(this.i + 1, this.j)].walls[3] == false){
                    this.i += 1;
                    this.highlightSeeker();
                }
                else{
                    this.penalty += 1;
                }
            }
            
            //Down
            else if(this.dna[i] == directions[2] && this.j < rows){
                if(grid[index(this.i, this.j + 1)] != null && grid[index(this.i, this.j + 1)].walls[0] == false){
                    this.j += 1;
                    this.highlightSeeker();
                }
                else{
                    this.penalty += 1;
                }
 
            }
            //Left
            else if(this.dna[i] == directions[3] && this.i != 0 ){
                if(grid[index(this.i - 1, this.j)] != null && grid[index(this.i - 1, this.j)].walls[1] == false){
                    this.i -= 1;
                    this.highlightSeeker();
                }
                else{
                    this.penalty += 1;
                }
            }
            else{
                
                this.penalty += 1;
            }
            
        }
        this.checkFitness();
    }

    seeker.prototype.highlightOff = function(){
		var x = this.i * w;
		var y = this.j * w;
		noStroke();
		fill(255, 0, 255, 100);
		rect(x, y, w, w);
	}

    seeker.prototype.highlightSeeker = function(){
        var x = this.i * w;
        var y = this.j * w;
        noStroke();
        fill(255, 0, 0, 100);
        rect(x, y, w, w);
    }
    
    seeker.prototype.checkFitness = function(){
        if(this.i == cols - 1 && this.j == rows -1){
            console.log("Success!");
            console.log(this);
            throw("You found the solution");
        }
        else{
            d = (Math.abs(cols - this.j) + Math.abs(rows - this.i)) + this.penalty;
            d = 1/d;
             
            if(this.i == 0 && this.j == 0){
                this.fitness = 1/100;
            }
            else{
                this.fitness = d + 10;
            }

        }


 
    }
}

