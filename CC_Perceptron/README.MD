# Perceptron 

## Links: 
First I want to give credit to where it is due, this code is based on the series by Daniel Shiffman where he goes over how to create a basic [Perceptron](https://www.youtube.com/watch?v=XJ7HLz9VYz0&list=PLRqwX-V7Uu6Y7MdSCaIfsxc561QI0U0Tb)

In addition 3Blue1Brown has a beautiful series on breaking down neural networks into their mathematical properties and really helped wrap my head more around the concepts of neural networks: [Neural Network Series](https://www.youtube.com/watch?v=aircAruvnKk&list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi)

## About the Project
The project consisted of several parts and subcategories. The best way to start would be to first outline the goal:
1. Build a Perceptron

What a perceptron is is that it takes in inputs, multiply those inputs by randomized weights, and spits back an output. What is important however is how to get this perceptron to **"learn"** which involves gradient descent. 

In order to test the perceptron built, randomized dots were created and plotted on a canvas. A line was drawn through the canvas to where the perceptron then had to figure out if the dots are above or lower than the line. 

Through supervised learning, the perceptron was told if it was right or wrong which it then corrected its model. 

>Equation: Error = Answer - Guess

To where to modify the weights the weights were at every iteration trained by the equation:

> weights += input * error * learning_rate

The learning weight was to prevent the model from heavily overcorrecting. There is more to go in depth, but that is the main gist. As the perceptron was supervised and told whether it was right or wrong, it corrected its weight closer and closer to the actual line in order to guess whether dots were above or below the line. 

## How to Run the Project

There is an .exe file for Windows 32 and 64 bit. By cloning this reposistory, downloading the .exe file and running it you will see a canvas with bunch of green and red dots pop up. 

By clicking the screen, the model will train itself, and a line on the screen will change to come to a closer approximation of the actual line that it is trying to figure out if dots are above or below. 

## What I learnt from the Project:

I got to apply subjects from my object oriented programming class, graphical processing using Processing, and calculus concepts such as gradient descent and work with the math to build a fundamental building block of neural networks. 
