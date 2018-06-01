import numpy as np 
import math

def sigmoid(x):
  return 1 / (1 + math.exp(-x))

class NeuralNetwork:
    def __init__(self, input, numNodesPerHidden, outputNodes):
        #Initializing Nodes
        numNodesPerHiddenLayer = numNodesPerHidden

        self.input = np.matrix(np.array(input))
        self.hiddenOne = np.zeros(shape=(1, numNodesPerHiddenLayer))
        self.hiddenTwo = np.zeros(shape=(1, numNodesPerHiddenLayer))
        self.output = np.zeros(shape=(1, outputNodes))

        # #Initializing Weights
        self.h1_i = np.random.rand(len(input), numNodesPerHiddenLayer)
        self.h2_h1 = np.random.rand(numNodesPerHiddenLayer, numNodesPerHiddenLayer)
        self.w_h2 = np.random.rand(numNodesPerHiddenLayer, outputNodes)

        #Bias
        self.bias1 = np.full((1, numNodesPerHiddenLayer), 1)
        self.bias2 = np.full((1, numNodesPerHiddenLayer), 1)
        self.bias3 = np.full((1, outputNodes), 1)

        self.sigmoid_Vectorize = np.vectorize(sigmoid)

        #Code to Check if Sigmoid Function is Working
        # self.bias4 = np.full((1, 1), 0.1)
        # print(self.sigmoid_Vectorize(self.bias4))

    
    def feedForward(self):
        self.hiddenOne = self.sigmoid_Vectorize(np.add(np.dot(self.input, self.h1_i), self.bias1))
        self.hiddenTwo = self.sigmoid_Vectorize(np.add(np.dot(self.hiddenOne, self.h2_h1), self.bias2))
        self.output = self.sigmoid_Vectorize(np.add(np.dot(self.hiddenTwo, self.w_h2), self.bias3))


def main():
    lst = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    #Hidden Layer Amt will always be 2
    nn = NeuralNetwork(lst, 10, 10)
    nn.feedForward()
    print(nn.output)

main()