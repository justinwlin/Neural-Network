# Maze Generation Genetic Algorithm

## Semi-Success
This project involved using: 
1. Genetic Algorithm
2. Javascript

## Background Information:
This project has two parts:
1. A random maze generator based on a depth-first backtracking algorithm.
2. A self-initiated project to try to explore genetic algorithms further in-depth after gaining experience from making a genetic algorithm on Shiffman tutorial on a continous ecosystem where different member of the population tries to eat "food" or "poison". 

## Problems and Potential Future Improvement:

This project was an interesting challenge in that I was not used to Javascript and that there were various variables which I had to learn to consider and tweak - still sadly in the end, not getting it to fully be optimized/to solve the maze, but I still learnt alot. The main problem with the algorithm is that the population is **becoming too homogenous**, meaning that the DNA of any dominate pathseeker is overwhelming the population. 

This is probably due to my fitness function, where the way fitness is calculated, due to be on a cartesian plane is **abs(x2 - x1) + abs(y2 - y1) + penality**; penalties being how many times a pathseeker runs into a wall. 

This was probably the main source of my problem due to this meaning that the higher the number, the less "fit" it was. But my pool selection was based on a algorithm of a "higher fitness", meaning that I had to invert the fitness with a 1/x. 

1/x however being an exponential function, probably gave the higher fitness level too drastic of a curve, meaning that as soon as one population took over, it permanently took over even with playing around with a 1% - 5% mutation rate. 

Even breeding didn't introduce that much variation due to the population already being homogenous. In the future, it be interesting to revisit this project more again, to see how to improve it. I might generate more standard mazes for the algorithm to solve so that I can recreate scenarios and so that I wouldn't have to generate a maze everytime randomly. 

## Summary:

I learnt how to apply and create a genetic algorithm taking from Shiffman Tutorial on a Evolutionary Steering Behavior, and taking the concept of a genetic algorithm and applying it to something else. 

While the code is accurate and working, I need to learn to further refine the fitness function, mutation rate, and other variables. 

## How to Run if Interested:
1. Have the ability to deploy a live server
2. Have Node.js installed
3. cd to the folder and run your live server, which should open up in a browser window for you.


## Resources Referenced:

### 2D Maze GA Algorithms / Maze Algorithms which I used for Reference/Inspiration: 
1. https://en.wikipedia.org/wiki/Maze_solving_algorithm
2. http://www.tonytruong.net/solving-a-2d-maze-game-using-a-genetic-algorithm-and-a-search-part-2/
3. http://datagenetics.com/blog/november22015/index.html 
4. Recursive BackTracker Implementated: https://en.wikipedia.org/wiki/Maze_generation_algorithm

### Daniel Shiffman Tutorial
1. Pool Selection Implementation: https://youtu.be/ETphJASzYes
2. Daniel Shiffman Tutorial on a Steering Evolution: https://youtu.be/VnFF5V5DS8s
