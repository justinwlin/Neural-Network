import math

def gradientDescent(func, gradient, input):
    inputNum = input
    control = True
    prev = None
    while(control):
        step = inputNum - 0.1 * gradient(inputNum)
        if(prev == None):
            prev = step
            inputNum = step
        else:
            if(abs(step - prev) < 0.0001):
                return step 
            else:
                prev = step
                inputNum = step

def funcX(x):
    return pow(x, 2)

def funcGradient(x):
    return 2 * x

print(gradientDescent(funcX, funcGradient, -10))

            


        