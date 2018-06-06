//Mutate Function to pass through to .mutate() in bird
function mutate(x) {
  if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

class Bird {
  constructor(brain) {
    // position and size of bird
    this.x = 64;
    this.y = height / 2;
    this.r = 12;

    // Gravity, lift and velocity
    this.gravity = 0.8;
    this.lift = -12;
    this.velocity = 0;

    if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
      this.brain.mutate(mutate);
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }
    this.score = 0;
    this.fitness = 0;
  }

  copy() {
    return new Bird(this.brain); //For GA to pass on brain
  }

  show() {
    fill(255, 100);
    stroke(255);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  think(pipes) {
    let closest = null;
    let record = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let diff = pipes[i].x - this.x;
      if (diff > 0 && diff < record) {
        record = diff;
        closest = pipes[i];
      }
    }

    if (closest != null) {
      //MAP INPUTS:
      //(currentValue, minOfCurrent Range, MaxOfCurrentRange, minOfMap Range, MaxOfMap Range)
      let inputs = [map(closest.x, this.x, width, 0, 1),map(closest.top, 0, height, 0, 1),map(closest.bottom, 0, height, 0, 1), map(this.y, 0, height, 0, 1), map(this.velocity, -5, 5, 0, 1) ];
      //Passing in pipes: x-distance, top pipe, bottom pipe, y-of the bird, the velocity of the bird
      // Get the outputs from the network
      let action = this.brain.predict(inputs);
      // Decide to jump or not!
      if (action[1] > action[0]) {
        this.up();
      }
    }
  }

  // Jump up
  up() {
    this.velocity += this.lift;
  }

  bottomTop() {
    //Bird dies if touch top or bottom of the screen
    return (this.y > height || this.y < 0);
  }

  // Update bird's position based on velocity, gravity, etc.
  update() {
    this.velocity += this.gravity;
    // this.velocity *= 0.9;
    this.y += this.velocity;

    // Every frame it is alive increases the score
    this.score++;
  }
}