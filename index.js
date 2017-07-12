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
const packagesName = cli.input;
const params = {timeout: 1000}

const spinner = ora('Looking for your name').start();

const maintaners = (maintaners) => maintaners.map(maintaner => `${maintaner.name} - ${maintaner.email}`)

const showAuthor = (data) => {
	if(data.author) {
		if(data.author.name && data.author.url) {
			return `${data.author.name} - ${data.author.url}`
		}
		return `${data.author.name}`
	}

	return maintaners(data.maintainers).join('\n  ');
}

if(!cli.input[0]) {
	return console.log(chalk.red.bold(getText('noParams')))
}

packagesName.map((p) => {
	const uri = `https://registry.npmjs.org/${p}`
	fetch(uri).then((res) => res.json()).then((data) => {
	if(Object.keys(data).length === 0) {
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
	})
})
