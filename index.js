var assert = require('assert');
var fs = require('fs');
var program = require('commander');

const DEFAULT_WORDS_PATH = __dirname + '/lib/words.txt';

const ERR_WORDLIST_NOT_FOUND = 'Word list not found';
const ERR_DEFAULT_WORDS_NOT_FOUND = 'Default word list not found';
const ERR_NO_INPUT = 'A state name must be supplied';
const ERR_INPUT_NOT_FOUND = 'State not found';

program
	.version(require(__dirname + '/package.json').version)
	.usage('[options] state name')
	.option('-w, --words <path>', 'specify a different word list')
	.parse(process.argv);

process.on('uncaughtException', function (err) {
	console.error('Error: %s', err.message);
	process.exit(1);
});

var path = program.words;
if (path !== undefined) {
	assert(fs.existsSync(path), ERR_WORDLIST_NOT_FOUND);
}

var chosenState = program.args.join(' ');
assert.notEqual(chosenState, undefined, ERR_NO_INPUT);
assert.notEqual(chosenState, '', ERR_NO_INPUT);
chosenState = chosenState.toLowerCase().replace(/\W/g, '');

var allStates = [
	'Alabama',
	'Alaska',
	'Arizona',
	'Arkansas',
	'California',
	'Colorado',
	'Connecticut',
	'Delaware',
	'Florida',
	'Georgia',
	'Hawaii',
	'Idaho',
	'Illinois',
	'Indiana',
	'Iowa',
	'Kansas',
	'Kentucky',
	'Louisiana',
	'Maine',
	'Maryland',
	'Massachusetts',
	'Michigan',
	'Minnesota',
	'Mississippi',
	'Missouri',
	'Montana',
	'Nebraska',
	'Nevada',
	'New Hampshire',
	'New Jersey',
	'New Mexico',
	'New York',
	'North Carolina',
	'North Dakota',
	'Ohio',
	'Oklahoma',
	'Oregon',
	'Pennsylvania',
	'Rhode Island',
	'South Carolina',
	'South Dakota',
	'Tennessee',
	'Texas',
	'Utah',
	'Vermont',
	'Virginia',
	'Washington',
	'West Virginia',
	'Wisconsin',
	'Wyoming'
];

var reducedStateNames = [];
allStates.forEach(function (state) {
	reducedStateNames.push(state.toLowerCase().replace(' ', ''));
});

assert.notEqual(reducedStateNames.indexOf(chosenState), -1, ERR_INPUT_NOT_FOUND);

if (path === undefined) {
	path = DEFAULT_WORDS_PATH;
}
assert(fs.existsSync(path), ERR_DEFAULT_WORDS_NOT_FOUND);

var wordList = fs
	.readFileSync(path)
	.toString()
	.split(/\r?\n/g)
	.map(function (word) {
		return word
			.toLowerCase()
			.replace(/\W/g, '');
	});

var hasLettersInCommon = function (left, right) {
	var i, j, l, m;
	l = left.length;
	m = right.length;
	for (i = 0; i < l; i++) {
		for (j = 0; j < m; j++) {
			if (left.charCodeAt(i) === right.charCodeAt(j)) {
				return true;
			}
		}
	}
	return false;
};

var wordsWithNoLettersInCommon = function (word, list) {
	return list.filter(function (listItem) {
		return !hasLettersInCommon(word, listItem);
	});
};

var wordsWithNoLettersInCommonWithChosenState =
	wordsWithNoLettersInCommon(chosenState, wordList);

var otherStates = reducedStateNames.filter(function (state) {
	return state !== chosenState;
});

var uniqueWords = wordsWithNoLettersInCommonWithChosenState.filter(function (word) {
	return otherStates.every(function (state) {
		return hasLettersInCommon(state, word);
	});
});

console.log(uniqueWords.join('\n'));