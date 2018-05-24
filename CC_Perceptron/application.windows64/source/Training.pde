//Equation
float f(float x) {
  //y = mx + b;
  return 0.3  * x + 0.2;
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
  float pixelX() {
    return map(x, -1, 1, 0, width);
  }

  float pixelY() {
    return map(y, -1, 1, height, 0);
  }
  
  //Draw
  void show() {
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
