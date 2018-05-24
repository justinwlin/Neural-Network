import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class CC_Perceptron extends PApplet {

Point[] points = new Point[100];
Perceptron brain = new Perceptron(3);

public void setup() {
  
  for (int i = 0; i < points.length; i++) {
    points[i] = new Point();
  }
}

public void draw() {
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
public void mousePressed() {
  for (Point pt : points) {
    float[] inputs = {pt.x, pt.y, pt.bias};
    brain.train(inputs, pt.label);
  }
}
public int sign (float n) {
  return (n>=0) ? 1 : -1;
}

class Perceptron {
  float[] weights;
  float learning_rate = 0.01f;

  Perceptron(int n) {
    weights = new float[n];
    //Init Random Weights
    for (int i = 0; i < weights.length; i++) {
      weights[i] = random (-1, 1);
    }
  }

  public int guess(float[] inputs) {
    float sum = 0;
    for (int i = 0; i < weights.length; i++) {
      sum += inputs[i] * weights[i]; //input * weight;
    }
    return sign(sum); //Output : 1 or -1.
  }

  /*
  Gradient Descent
   */
  public void train(float[] inputs, int target) {
    int guess = guess(inputs);
    int error = target - guess;

    for (int i = 0; i < weights.length; i++) {
      weights[i] += inputs[i] * error * learning_rate; //Changing the weights relative to error
    }
  }

  public float guessY(float x) {
    return -1*(weights[2] / weights[1]) - (weights[0]/weights[1]) * x;
  }
}
//Equation
public float f(float x) {
  //y = mx + b;
  return 0.3f  * x + 0.2f;
}

//Point
class Point {
  
  //Constructor/init.
  float x, y;
  float bias = 1;
  int label;

  Point() {
    x = random(-1, 1);
    y = random(-1, 1);
    float lineY = f(x);

    label = (y > lineY) ? 1:-1;
  }

  Point(float X, float Y) {
    x = X;
    y = Y;
  }
  
  //Mapping Functions
  public float pixelX() {
    return map(x, -1, 1, 0, width);
  }

  public float pixelY() {
    return map(y, -1, 1, height, 0);
  }
  
  //Draw
  public void show() {
    stroke(0);
    if (label == 1) {
      fill(255);
    } else {
      fill(0);
    }

    float px = pixelX();
    float py = pixelY();

    ellipse(px, py,16 , 16);
  }
}
  public void settings() {  size(800, 800); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "CC_Perceptron" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
