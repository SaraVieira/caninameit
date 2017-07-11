#!/usr/bin/env node
'use strict';
const meow = require('meow');
const canisuseit = require('.');
const chalk = require('chalk');
const getText = require('./src/text')
const ora = require('ora');
const cli = meow(getText('usage'));
const fetch = require('node-fetch');


const flags = cli.flags;
const packageName = cli.input[0];
const uri = `https://registry.npmjs.org/${packageName}`
const params = {timeout: 1000}

const spinner = ora('Looking for your name').start();

const maintaners = (maintaners) => maintaners.map(maintaner => `${maintaner.name} - ${maintaner.email}\n`)

const showAuthor = (data) => {
	if(data.author) {
		if(data.author.name && data.author.url) {
			return `${data.author.name} - ${data.author.url}`
		}
		return `${data.author.name}`
	}

	return maintaners(data.maintainers);
}

if(!cli.input[0]) {
	return console.log(chalk.red.bold(getText('noParams')))
}

fetch(uri).then((res) => res.json()).then((data) => {
if(Object.keys(data).length === 0) {
	return spinner.succeed(chalk.green.bold(getText('success')));
}
spinner.fail(chalk.red.bold(getText('error')));
console.log(chalk`
It was created by:
  {blue.bold ${showAuthor(data)} }

It's at version:
  {blue.bold ${data['dist-tags'].latest} }

You can find it at:
  https://www.npmjs.com/package/${packageName}

`);
})
