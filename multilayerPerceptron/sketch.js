function setup() {
	let nn = new NeuralNetwork(2, 2, 2);
	let input = [1, 0];
	let targets = [1, 1];
	
	nn.train(input, targets);
}