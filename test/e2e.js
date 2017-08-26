const test = require('ava');
const execa = require('execa');

test('package name not given', async t => {
	const expected = '\nYou need to pass a package name so I can do my thing 😉';

	await execa('node', ['index']).then(result => {
		t.is(result.stdout, expected);
	});
});

test('package is available', async t => {
	const expected =
    '✔ no-way-this-is-taken - NICE! The name is not taken you can claim it! 🍕 🎉🎉🎉';

	await execa('node', ['index', 'no-way-this-is-taken']).then(result => {
    /*
      Found a bug here

      The message is given in stderr, not stdout
    */
		t.is(result.stderr, expected);
	});
});

/*
  This is very fragile test, as it depends on an external project.

  An alternative way of doing this is to create a dummy package
  that you can rely on.

  Example: https://npmjs.com/@siddharthkp/empty
*/
test('package already exists', async t => {
	const expectedStderr = '✖ preact - Damn it, the name is already taken ☹️';
	const expectedStdout = `
It was created by:
  Jason Miller

It's at version:
  8.2.4

You can find it at:
  https://www.npmjs.com/package/preact

	`;

	await execa('node', ['index', 'preact']).then(result => {
		t.is(result.stderr, expectedStderr);
		t.is(result.stdout, expectedStdout);
	});
});

test('package already exists but with idc flag', async t => {
	const expectedStderr = '✖ react - Damn it, the name is already taken ☹️';
	await execa('node', ['index', 'react', '--idc']).then(result => {
		t.is(result.stderr, expectedStderr);
	});
});

test('gives help text', async t => {
	const expected = `
  A cli tool to help you see a npm name is already taken because this a problem now 😱

  Usage
    $ canisuseit [input]

  Examples
    $ canisuseit lodash
     > No this name is already taken
	`;

	await execa('node', ['index', '--help']).then(result => {
		t.is(result.stdout, expected);
	});
});
