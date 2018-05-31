function sigmoid(x){
    return 1 / (1 + Math.exp(-x));
}

function dsigmoid(y){
    //return (sigmoid(x) * (1 - sigmoid(x)));
    return y * (1 - y);
}

class NeuralNetwork{
    //	let nn = new NeuralNetwork(2, 2, 1);
    constructor(input_nodes, hidden_nodes, output_nodes){

        //Matrix math requires that the column of the first matrix must match the rows of the second matrix

        //Initializing number of nodes
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        //Initializing the Matrix for input -> hidden; hidden -> output
        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes); //2 rows, 2 cols
        this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes); //1 row, 2 cols
        this.weights_ih.randomize();
        this.weights_ho.randomize();

        this.bias_h = new Matrix(this.hidden_nodes, 1); //2 row, 1 col
        this.bias_o = new Matrix(this.output_nodes, 1); //1 row, 1 col
        this.bias_h.randomize();
        this.bias_o.randomize();

        this.learning_rate = 0.1;
    }

    feedforward(input_array){
        let inputs = Matrix.fromArray(input_array);
        let hidden = Matrix.multiply(this.weights_ih, inputs);
        hidden.add(this.bias_h);
        hidden.map(sigmoid);

        let output = Matrix.multiply(this.weights_ho, hidden);
        output.add(this.bias_o);

        output.map(sigmoid);

        return output.toArray();
    }
    train(input_array, target_array) {
        // Generating the Hidden Outputs
        let inputs = Matrix.fromArray(input_array);
        let hidden = Matrix.multiply(this.weights_ih, inputs);
        hidden.add(this.bias_h);
        // activation function!
        hidden.map(sigmoid);
    
        // Generating the output's output!
        let outputs = Matrix.multiply(this.weights_ho, hidden);
        outputs.add(this.bias_o);
        outputs.map(sigmoid);
    
        // Convert array to matrix object
        let targets = Matrix.fromArray(target_array);
    
        // Calculate the error
        // ERROR = TARGETS - OUTPUTS
        let output_errors = Matrix.subtract(targets, outputs);
    
        // let gradient = outputs * (1 - outputs);
        // Calculate gradient
        let gradients = Matrix.map(outputs, dsigmoid);
        gradients.multiply(output_errors);
        gradients.multiply(this.learning_rate);
    
    
        // Calculate deltas
        let hidden_T = Matrix.transpose(hidden);
        let weight_ho_deltas = Matrix.multiply(gradients, hidden_T);
    
        // Adjust the weights by deltas
        this.weights_ho.add(weight_ho_deltas);
        // Adjust the bias by its deltas (which is just the gradients)
        this.bias_o.add(gradients);
    
        // Calculate the hidden layer errors
        let who_t = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(who_t, output_errors);
    
        // Calculate hidden gradient
        let hidden_gradient = Matrix.map(hidden, dsigmoid);
        hidden_gradient.multiply(hidden_errors);
        hidden_gradient.multiply(this.learning_rate);
    
        // Calcuate input->hidden deltas
        let inputs_T = Matrix.transpose(inputs);
        let weight_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);
    
        this.weights_ih.add(weight_ih_deltas);
        // Adjust the bias by its deltas (which is just the gradients)
        this.bias_h.add(hidden_gradient);
    
      }
    // train(input_array, target_array){
    //     let inputs = Matrix.fromArray(input_array);
    //     let hidden = Matrix.multiply(this.weights_ih, inputs);
    //     hidden.add(this.bias_h);
    //     hidden.map(sigmoid);

    //     let outputs = Matrix.multiply(this.weights_ho, hidden);
    //     outputs.add(this.bias_o);
    //     outputs.map(sigmoid);

    //     target_array = Matrix.fromArray(target_array);
    //     let output_errors = Matrix.subtract(target_array, outputs);

    //     let gradients = Matrix.map(outputs, dsigmoid);  
    //     outputs.multiply(output_errors);
    //     outputs.multiply(this.learning_rate);

    //     let hidden_T = Matrix.transpose(hidden);
    //     let weight_ho_deltas = Matrix.multiply(gradients, hidden_T);

    //     //adjust weight by delta
    //     this.weights_ho.add(weight_ho_deltas);
    //     //adjust bias by it delta
    //     this.bias_o.add(gradients);

    //     let who_t = Matrix.transpose(this.weights_ho);
    //     let hidden_errors = Matrix.multiply(who_t, output_errors);


    //     let hidden_gradient = Matrix.map(hidden, dsigmoid);
    //     hidden_gradient.multiply(hidden_errors);
    //     hidden_gradient.multiply(this.learning_rate);

    //     //calculate input ->hidden delta
    //     let inputs_T = Matrix.transpose(inputs);
    //     let weights_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);
    //     this.weights_ih.add(weights_ih_deltas);
    //     this.bias_h.add(hidden_gradient);
    // }
}

