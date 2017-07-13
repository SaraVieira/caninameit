const test = require('ava');
const getStuff = require('../src/get-data');

const withAuthorandUrl = {
	author: {
		name: 'Robot',
		url: 'http://hadk.com'
	}
};

const withAuthor = {
	author: {
		name: 'Robot'
	}
};

const withMaintaners = {
	maintainers: [
		{
			name: 'Robot',
			email: 'Robot@hadk.com'
		},
		{
			name: 'Robot1',
			email: 'Robot1@hadk.com'
		}
	]
};

test('withAuthorandUrl', t => {
	const author = getStuff.getAuthor(withAuthorandUrl);
	t.is(author, 'Robot - http://hadk.com');
});

test('withAuthor', t => {
	const author = getStuff.getAuthor(withAuthor);
	t.is(author, 'Robot');
});

test('withMaintaners', t => {
	const maintaners = getStuff.getAuthor(withMaintaners);
	t.is(maintaners, 'Robot - Robot@hadk.com\n  Robot1 - Robot1@hadk.com');
});
