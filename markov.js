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
			let word = this.words[i];
			let nextWord = this.words[i + 1] || null;

			if (!chains[word]) {
				chains[word] = Array(nextWord);
				// Creates a new Array object if does not yet exist
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
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		// TODO
		let keys = Object.keys(this.chains); // method returns an array of a given object's own enumerable property names
		let nextWord = MarkovMachine.randomChoice(keys);
		let output = Array(nextWord);

		while (output.length < numWords && nextWord !== null) {
			let chain = this.chains[nextWord];
			nextWord = MarkovMachine.randomChoice(chain);

			if (nextWord != null) {
				output.push(nextWord);
			}
		}
		return output.join(' ');
	}
}

let mm = new MarkovMachine('the cat in the hat');

module.exports = {
	MarkovMachine,
};
