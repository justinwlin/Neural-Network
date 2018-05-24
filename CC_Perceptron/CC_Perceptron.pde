Point[] points = new Point[100];
Perceptron brain = new Perceptron(3);

void setup() {
  size(800, 800);
  for (int i = 0; i < points.length; i++) {
    points[i] = new Point();
  }
}

void draw() {
  /*
  =============================================
   Drawing Line that we are comparing against
   =============================================
   */
  background(235);
  stroke(0);
  Point p1 = new Point(-1, f(-1));
  Point p2 = new Point(1, f(1));
  line(p1.pixelX(), p1.pixelY(), p2.pixelX(), p2.pixelY());

  /*
  =============================================
   Drawing the line that the Perceptron Thinks...
   =============================================
   */

  Point p3 = new Point(-1, brain.guessY(-1));
  Point p4 = new Point(1, brain.guessY(1));
  line(p3.pixelX(), p3.pixelY(), p4.pixelX(), p4.pixelY());
  for (Point pt : points) {
    pt.show(); //Drawing the Points
    /*
    ======================
     Logic
     ======================
     */
    float[] inputs = {pt.x, pt.y, pt.bias};
    int guess = brain.guess(inputs);
    
    //Visual Green or Red if Perceptron is Right or Wrong
    if (guess == pt.label) {
      fill(0, 255, 0);
    } else {
      fill(255, 0, 0);
    } 
    noStroke();
    ellipse(pt.pixelX(), pt.pixelY(), 14, 14);
  }
}

 //Allowing Mouse Press to Train if brain.train is commented
void mousePressed() {
  for (Point pt : points) {
    float[] inputs = {pt.x, pt.y, pt.bias};
    brain.train(inputs, pt.label);
  }
}
