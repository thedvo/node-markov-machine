/** Command-line tool to generate Markov text. */

const fs = require('fs');
const { MarkovMachine } = require('./markov');
const axios = require('axios');
const process = require('process');

// creates Markov Machine from the text and generates text from it
function generateText(text) {
	let mm = new MarkovMachine(text);
	console.log(mm.makeText());
}

// reads the file and makes text from it
function makeText(path) {
	fs.readFile(path, 'utf8', function (err, data) {
		if (err) {
			console.error('Error, cannot read file', err);
			process.exit(1);
		} else {
			generateText(data);
		}
	});
}

// reads the URL and makes text from it
async function makeURLText(url) {
	let response;

	try {
		response = await axios.get(url);
	} catch (err) {
		console.error('Error, cannot read URL', err);
		process.exit(1);
	}
	generateText(response.data);
}

// interprets command line input to proceed with specified action
let [method, path] = process.argv.slice(2);

if (method === 'file') {
	makeText(path);
} else if (method === 'url') {
	makeURLText(path);
} else {
	console.error('Method unknown.', err);
	process.exit(1);
}
