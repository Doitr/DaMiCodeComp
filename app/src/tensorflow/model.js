import * as tf from '@tensorflow/tfjs';

const trainModel = async (inputs, outputs, size, window_size, n_epochs, learning_rate, n_layers) => {
	const input_layer_shape = window_size;
	const input_layer_neurons = size * window_size;

	const rnn_input_layer_features = size;
	const rnn_input_layer_timesteps = input_layer_neurons / rnn_input_layer_features;

	const rnn_input_shape = [rnn_input_layer_features, rnn_input_layer_timesteps];
	const rnn_output_neurons = 20;

	const rnn_batch_size = window_size;

	//const output_layer_shape = rnn_output_neurons;
	const output_layer_shape = rnn_output_neurons;
	const output_layer_neurons = size; 

	const model = tf.sequential();
	
	//console.log(inputs.length)
	//console.log(inputs)

	inputs = inputs.slice(0, Math.floor(size / 100 * inputs.length));
	outputs = outputs.slice(0, Math.floor(size / 100 * outputs.length));

	const xs = tf.tensor2d(inputs, [inputs.length, inputs[0].length]);
	const ys = tf.tensor2d(outputs, [outputs.length, outputs[0].length]);
	// const ys = tf.tensor2d(outputs, [outputs.length, 1]).reshape([outputs.length, 1]).div(tf.scalar(10));

	model.add(tf.layers.dense({ units: input_layer_neurons, inputShape: [input_layer_shape] }));
	model.add(tf.layers.reshape({ targetShape: rnn_input_shape }));

	var lstm_cells = [];
	for (let index = 0; index < n_layers; index++) {
		lstm_cells.push(tf.layers.lstmCell({ units: rnn_output_neurons }));
	}

	model.add(tf.layers.rnn({
		cell: lstm_cells,
		inputShape: rnn_input_shape, returnSequences: false
	}));

	model.add(tf.layers.dense({ units: output_layer_neurons, inputShape: [input_layer_shape] }));

	const opt_adam = tf.train.adam(learning_rate);
	model.compile({ optimizer: opt_adam, loss: 'meanSquaredError' });

	const hist = await model.fit(xs, ys,
		{
			batchSize: rnn_batch_size, epochs: n_epochs, callbacks: {
				//onEpochEnd: async (epoch, log) => { callback(epoch, log); }
			}
		});
		
	const wrapper_train = { model: model, stats: hist };

	return wrapper_train;
}

const Predict = (inputs, size, model) => {
	var inps = inputs; //.slice(Math.floor(size / 100 * inputs.length), inputs.length);
	const outps = model.predict(tf.tensor2d(inps, [inps.length,
	inps[0].length]).div(tf.scalar(10))).mul(10);
	
	const wrapper_pred = Array.from(outps.dataSync());

	return wrapper_pred;
}


export default {
	trainModel, Predict
}