import numpy as np 
import math
import random

def sigmoid(x):
  return 1 / (1 + math.exp(-x))

def dsigmoid(y):
    return y * (1 - y)

class NeuralNetwork:
    def __init__(self, inputNodes, numNodesPerHidden, outputNodes):
        self.learning_rate = 0.5
        #Initializing Nodes
        numNodesPerHiddenLayer = numNodesPerHidden
        self.learning_rate = 0.01
        self.inputNodes = inputNodes
        self.hiddenOne = np.zeros(shape=(numNodesPerHiddenLayer, 1))
        self.output = np.zeros(shape=(outputNodes, 1))

        # #Initializing Weights
        self.h1_i = np.random.rand(numNodesPerHiddenLayer, self.inputNodes)
        self.output_h1 = np.random.rand(outputNodes, numNodesPerHiddenLayer)

        #Bias
        self.bias1 = np.matrix(np.random.rand(numNodesPerHiddenLayer,1))
        self.bias2 = np.matrix(np.random.rand(outputNodes,1))

        self.sigmoid_Vectorize = np.vectorize(sigmoid)
        self.dsigmoid_Vectorize = np.vectorize(dsigmoid)

    def predict(self, inputArray):
        inputArrayNmpy = np.matrix(np.reshape(np.array(inputArray), (len(inputArray), 1)))
        self.hiddenOne = self.sigmoid_Vectorize(np.add(np.dot(self.h1_i, inputArrayNmpy), self.bias1))
        self.output = self.sigmoid_Vectorize(np.add(np.dot(self.output_h1, self.hiddenOne), self.bias2))
        print(self.output)

    def train(self, inputArray, targetArray):

        #input and target Conversion
        inputArrayNmpy = np.matrix(np.reshape(np.array(inputArray), (len(inputArray), 1)))
        if(len(targetArray) == 1):
            targetArrayNmpy = np.matrix(np.array(targetArray))
        else:
            targetArrayNmpy = np.matrix(np.reshape(np.array(targetArray), (len(inputArray), 1)))


        self.hiddenOne = self.sigmoid_Vectorize(np.add(np.dot(self.h1_i, inputArrayNmpy), self.bias1))
        self.output = self.sigmoid_Vectorize(np.add(np.dot(self.output_h1, self.hiddenOne), self.bias2))

        #Calculating the Cost Function
        # (y - target)
        output_error = np.subtract(targetArrayNmpy, self.output)
        hidden_error = np.dot(np.transpose(self.output_h1), output_error)

        #Gradient from Output to Hidden Layer 2 Calculations
        gradient_O_H = self.dsigmoid_Vectorize(self.output)
        gradient_O_H = np.multiply(gradient_O_H, output_error)
        gradient_O_H = np.multiply(gradient_O_H, self.learning_rate)
        weight_O_H_Delta = np.dot(gradient_O_H, np.transpose(self.hiddenOne))

        #Adjustments from Output to Hidden Layer 2:
        self.output_h1 = np.add(self.output_h1, weight_O_H_Delta)
        self.bias2 = np.add(self.bias2, gradient_O_H)

        #Hidden Layer to Input
        gradient_H2_H1_Output = self.dsigmoid_Vectorize(self.hiddenOne)
        gradient_H2_H1_Output = np.multiply(gradient_H2_H1_Output, hidden_error)
        gradient_H2_H1_Output = np.multiply(gradient_H2_H1_Output, self.learning_rate)
        #Weight Delta from HIdden Layer to Input
        weight_H2_H1_Delta = np.dot(gradient_H2_H1_Output, np.transpose(inputArrayNmpy))

        #Adjustments from Hidden Layer to Input
        self.h1_i = np.add(self.h1_i, weight_H2_H1_Delta)
        self.bias1 = np.add(self.bias1, gradient_H2_H1_Output)

def main():
    #Ex. Input
    #Hidden Layer Amt will always be 2
    nn = NeuralNetwork(2, 10, 1) #Input, Number Nodes Per Hidden Layer, Output Nodes
    inputAndTarget = [([0,0], [0]), ([1, 1], [0]), ([1, 0], [1]), ([0, 1], [1])]
    for i in range(10000):
        randomGen = random.randint(0,0)
        nn.train(inputAndTarget[randomGen][0], inputAndTarget[randomGen][1])
    nn.predict([0,0])
main()