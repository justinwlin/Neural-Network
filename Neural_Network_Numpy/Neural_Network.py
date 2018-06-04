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
        self.hiddenTwo = np.zeros(shape=(numNodesPerHiddenLayer, 1))
        self.output = np.zeros(shape=(outputNodes, 1))

        # #Initializing Weights
        self.h1_i = np.random.rand(numNodesPerHiddenLayer, self.inputNodes)
        self.h2_h1 = np.random.rand(numNodesPerHiddenLayer, numNodesPerHiddenLayer)
        self.output_h2 = np.random.rand(outputNodes, numNodesPerHiddenLayer)

        #Bias
        self.bias1 = np.full((numNodesPerHiddenLayer, 1), 1)
        self.bias2 = np.full((numNodesPerHiddenLayer, 1), 1)
        self.bias3 = np.full((outputNodes, 1), 1)

        self.sigmoid_Vectorize = np.vectorize(sigmoid)
        self.dsigmoid_Vectorize = np.vectorize(dsigmoid)

        #Code to Check if Sigmoid Function is Working
        # self.bias4 = np.full((1, 1), 0.1)
        # print(self.sigmoid_Vectorize(self.bias4))

    def predict(self, inputArray):
        inputArrayNmpy = np.matrix(np.reshape(np.array(inputArray), (len(inputArray), 1)))
        self.hiddenOne = self.sigmoid_Vectorize(np.add(np.dot(self.h1_i, inputArrayNmpy), self.bias1))
        self.hiddenTwo = self.sigmoid_Vectorize(np.add(np.dot(self.h2_h1, self.hiddenOne), self.bias2))
        self.output = self.sigmoid_Vectorize(np.add(np.dot(self.output_h2, self.hiddenTwo), self.bias3))
        print(self.output)

    def train(self, inputArray, targetArray):
        inputArrayNmpy = np.matrix(np.reshape(np.array(inputArray), (len(inputArray), 1)))
        if(len(targetArray) == 1):
            targetArrayNmpy = np.matrix(np.array(targetArray))
        else:
            targetArrayNmpy = np.matrix(np.reshape(np.array(targetArray), (len(inputArray), 1)))


        self.hiddenOne = self.sigmoid_Vectorize(np.add(np.dot(self.h1_i, inputArrayNmpy), self.bias1))
        self.hiddenTwo = self.sigmoid_Vectorize(np.add(np.dot(self.h2_h1, self.hiddenOne), self.bias2))
        self.output = self.sigmoid_Vectorize(np.add(np.dot(self.output_h2, self.hiddenTwo), self.bias3))


        #Calculating the Cost Function
        # (y - target)
        output_error = np.subtract(targetArrayNmpy, self.output)
        hidden2_error = np.dot(np.transpose(self.output_h2), output_error)
        hidden1_error = np.dot(np.transpose(self.h2_h1), hidden2_error)

        #Gradient from Output to Hidden Layer 2 Calculations
        gradient_O_H = self.dsigmoid_Vectorize(self.output)
        gradient_O_H = np.multiply(gradient_O_H, output_error)
        gradient_O_H = np.multiply(gradient_O_H, self.learning_rate)
        weight_O_H_Delta = np.dot(gradient_O_H, np.transpose(self.hiddenTwo))

        # #Adjustments from Output to Hidden Layer 2:
        self.output_h2 = np.add(self.output_h2, weight_O_H_Delta)
        self.bias3 = np.add(self.bias3, gradient_O_H)
        
        #Hidden Layer 2 to Hidden Layer 1 Gradient
        gradient_H2_H1_Output = self.dsigmoid_Vectorize(self.hiddenTwo)
        gradient_H2_H1_Output = np.multiply(gradient_H2_H1_Output, hidden2_error)
        gradient_H2_H1_Output = np.multiply(gradient_H2_H1_Output, self.learning_rate)
        #Weight Delta from HIdden Layer 2 to Hidden Layer 1 Gradient:
        weight_H2_H1_Delta = np.dot(gradient_H2_H1_Output, np.transpose(self.hiddenOne))
        
        #Adjustments from Hidden Layer 2 to Hidden Layer 1:
        self.h2_h1 = np.add(self.h2_h1, weight_H2_H1_Delta)
        self.bias2 = np.add(self.bias2, gradient_H2_H1_Output)

        #Hidden Layer 1 to Hidden Input
        gradient_H1_Input = self.dsigmoid_Vectorize(self.hiddenOne)
        gradient_H1_Input = np.multiply(gradient_H1_Input, hidden1_error)
        gradient_H1_Input = np.multiply(gradient_H1_Input, self.learning_rate)
        #Weight Delta from Hidden Layer 1 to Input Layer:
        weight_H1_Input_Delta = np.dot(gradient_H1_Input, np.transpose(inputArrayNmpy))

        #Adjustments from Hidden Layer 1 to Input Layer:
        self.h1_i = np.add(self.h1_i, weight_H1_Input_Delta)
        self.bias1 = np.add(self.bias1, gradient_H1_Input)
        




def main():
    #Ex. Input
    #Hidden Layer Amt will always be 2
    nn = NeuralNetwork(2, 10, 1) #Input, Number Nodes Per Hidden Layer, Output Nodes
    inputAndTarget = [([0,0], [.5]), ([1, 1], [.5]), ([1, 0], [.5]), ([0, 1], [.5])]
    for i in range(10000):
        randomGen = random.randint(0,3)
        nn.train(inputAndTarget[randomGen][0], [0.5])#inputAndTarget[randomGen][1])
    nn.predict([0, 0])
main()