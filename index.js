#!/usr/bin/env node
'use strict';
const meow = require('meow');
const chalk = require('chalk');
const ora = require('ora');
const fetch = require('node-fetch');
const getText = require('./src/text');

const cli = meow(getText('usage'));

const packagesName = cli.input;
/*
  These will be useful later:
  const flags = cli.flags;
  const params = {timeout: 1000};
*/

const spinner = ora('Looking for your name').start();

const maintaners = maintaners => maintaners.map(maintaner => `${maintaner.name} - ${maintaner.email}`);

const showAuthor = data => {
	if (data.author) {
		if (data.author.name && data.author.url) {
			return `${data.author.name} - ${data.author.url}`;
		}
		return `${data.author.name}`;
	}

	return maintaners(data.maintainers).join('\n  ');
};

const cancel = () => {
	console.log(chalk.red.bold(getText('noParams')));
	return false;
};

if (!cli.input[0]) {
	cancel();
}

packagesName.map(p => {
	const uri = `https://registry.npmjs.org/${p}`;
	return fetch(uri).then(res => res.json()).then(data => {
		if (Object.keys(data).length === 0) {
			return spinner.succeed(chalk.green.bold(`${p} - ${getText('success')}`));
		}
		spinner.fail(chalk.red.bold(`${p} - ${getText('error')}`));
		console.log(chalk`
It was created by:
  {blue.bold ${showAuthor(data)} }

It's at version:
  {blue.bold ${data['dist-tags'].latest} }

You can find it at:
  https://www.npmjs.com/package/${p}

	`);
	});
});
