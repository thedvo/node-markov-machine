/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		// given some input text, it splits it on spaces and linebreak characters to make a list of words. It then calls the makeChains function which builds a map of chains of word → possible-next-words.
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== '');
		this.makeChains();
	}

	/** set markov chains:
	 *  for text of "the cat in the hat", chains will be
	 *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		// creates a new object to populate with results
		let chains = {};

		for (let i = 0; i < this.words.length; i++) {
			// for the length of the words array, loop through each unique word and collect the words that occur after it.
			let word = this.words[i];
			let nextWord = this.words[i + 1] || null;

			if (!chains[word]) {
				chains[word] = Array(nextWord);
				// If the current word is not in the chain yet, it creates a new Array object if does not yet exist. New key/value pair
			} else {
				chains[word].push(nextWord);
				// if it does exist, push the next word to the array
			}
		}
		this.chains = chains;
	}

	// Picks a random choice from the array
	static randomChoice(array) {
		return array[Math.floor(Math.random() * array.length)];
		// picks a random word based on its index in the array
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		let keys = Object.keys(this.chains); // method returns an array of a given object's own enumerable property names
		let nextWord = MarkovMachine.randomChoice(keys); // selects a random word from the array of keys
		let output = Array(nextWord); // initializes output with an array including the random word

		while (output.length < numWords && nextWord !== null) {
			// while the length of the output array is less than numWords (100) and the next word is not null, keep selecting a random nextWord
			let chain = this.chains[nextWord];
			nextWord = MarkovMachine.randomChoice(chain);

			if (nextWord != null) {
				output.push(nextWord);
			}
		}
		return output.join(' ');
		// once loop is complete, concatenate the array into a single string to return the final output
	}
}

let mm = new MarkovMachine('the cat in the hat');

module.exports = {
	MarkovMachine,
};
