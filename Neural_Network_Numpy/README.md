# Supervised Deep Neural Network Model (Written using Python and Numpy)

## About:
This is a deep neural network that I programmed using Python and the Numpy math library in order to learn how to build a neural network for supervise learning. 

In order to test the model, I am training the neural network to learn how to categorize XOR inputs. 

#### Example:
  - 1,1 will return a 0
  - 0, 0 will return a 0
  - 1, 0 will return a 1
  - 0, 1 will return a 1

### Structure of the Neural Network:
The structure of the neural network has 1 input layer, 2 hidden layer, and one output layer. 
The number of nodes per layer can be modified to whatever is needed. 

### Further Applications:
The model can be infinitely expanded to whatever amount of inputs and outputs are necessary. The neural network class takes in: number of input nodes, number of nodes for both hidden layer, and how many output nodes. 

Meaning that my neural network is able to run and learn datasets like the [Mnist dataset](http://yann.lecun.com/exdb/mnist/) , by expanding the amount of inputs to 28x28 (784), and allowing 9 outputs (1 - 9).

## How to Run:
Download the file, either copying/pasting or downloading the repository, and run it using Python 3.0 or greater. 
