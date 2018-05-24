int sign (float n) {
  return (n>=0) ? 1 : -1;
}

class Perceptron {
  float[] weights;
  float learning_rate = 0.01;

  Perceptron(int n) {
    weights = new float[n];
    //Init Random Weights
    for (int i = 0; i < weights.length; i++) {
      weights[i] = random (-1, 1);
    }
  }

  int guess(float[] inputs) {
    float sum = 0;
    for (int i = 0; i < weights.length; i++) {
      sum += inputs[i] * weights[i]; //input * weight;
    }
    return sign(sum); //Output : 1 or -1.
  }

  /*
  Gradient Descent
   */
  void train(float[] inputs, int target) {
    int guess = guess(inputs);
    int error = target - guess;

    for (int i = 0; i < weights.length; i++) {
      weights[i] += inputs[i] * error * learning_rate; //Changing the weights relative to error
    }
  }

  float guessY(float x) {
    return -1*(weights[2] / weights[1]) - (weights[0]/weights[1]) * x;
  }
}
