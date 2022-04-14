const { MarkovMachine } = require('./markov');

describe('test markov machine', function () {
	test('make chains', function () {
		let mm = new MarkovMachine('the cat in the hat');
		expect(mm.chains).toEqual({
			the: ['cat', 'hat'],
			cat: ['in'],
			in: ['the'],
			hat: [null],
		});
	});

	test('randomChoice picks random word from the array', function () {
		let array = ['the', 'cat', 'in', 'hat'];
		expect(array).toContain(MarkovMachine.randomChoice(array));
		expect(MarkovMachine.randomChoice(['cat', 'cat', 'cat'])).toEqual('cat');
	});

	test('machine returns a string', function () {
		let mm = new MarkovMachine('the cat is in the hat');
		let output = mm.makeText();
		expect(typeof output).toEqual('string');
	});

	test('makeText results with last word of input', function () {
		let mm = new MarkovMachine('the cat is in the hat');
		let output = mm.makeText();
		expect(output.endsWith('hat')).toBe(true);
	});
});
