import numpy as np 
import math

def sigmoid(x):
  return 1 / (1 + math.exp(-x))

inputSize = 5
numNodesPerHidden = 10
outputNodes = 1

#Inputs
x = np.random.rand(inputSize, 1)
#Weight
m = np.random.rand(numNodesPerHidden, inputSize)
#Bias
bias = np.full((numNodesPerHidden, 1), 1)

#Hidden Layer with 10 Nodes
hiddenLayerOne = np.zeros(shape=(numNodesPerHidden, 1))

#Multiplying
hiddenLayerOne = np.dot(m, x)
#Adding the Bias
hiddenLayerOne = np.add(hiddenLayerOne, bias)
#Sigmoid Vectorize
sigmoid_vectorize = np.vectorize(sigmoid)
#Applying Sigmoid to hiddenLayer
hiddenLayerOne = sigmoid_vectorize(hiddenLayerOne)
#(10, 1)


#Weights 2
w2 = np.random.rand(numNodesPerHidden, numNodesPerHidden)
#Bias 2
bias2 = np.full((numNodesPerHidden, 1), 1)

hiddenLayerTwo = np.zeros(shape=(1,numNodesPerHidden))

#multipying w2 * previousHiddenLayer("input")
hiddenLayerTwo = np.dot(w2, hiddenLayerOne)
#Adding Biases
hiddenLayerTwo = np.add(hiddenLayerTwo, bias2)
#Sigmoid
hiddenLayerTwo = sigmoid_vectorize(hiddenLayerTwo)

#output
outputWeight = np.random.rand(outputNodes, numNodesPerHidden)
bias3 = np.full((outputNodes, 1), 1)

output = np.dot(outputWeight, hiddenLayerTwo)
output = np.add(output, bias3)
output = sigmoid_vectorize(output)

print(output)






