#!/usr/bin/env node
'use strict'
const meow = require('meow')
const chalk = require('chalk')
const ora = require('ora')
const fetch = require('node-fetch')
const getText = require('./src/text')
const getAuthor = require('./src/getAuthor')

const cli = meow(getText('usage'))
const flags = cli.flags
const packagesName = cli.input

const spinner = ora('Looking for your name').start()

const cancel = () => {
  console.log(chalk.red.bold(getText('noParams')))
  return false
}

if (!cli.input[0]) {
  cancel()
}

packagesName.map(async p => {
  const uri = `https://registry.npmjs.org/${p}`
  const data = await fetch(uri)
  const response = await data.json()
  if (response.error) {
    return spinner.succeed(chalk.green.bold(`${p} - ${getText('success')}`))
  }
  spinner.fail(chalk.red.bold(`${p} - ${getText('error')}`))
  if (!flags.idc) {
    console.log(chalk`
It was created by:
  {blue.bold ${getAuthor(response)}}

It's at version:
  {blue.bold ${response['dist-tags'].latest}}

You can find it at:
  https://www.npmjs.com/package/${p}

`)
  }
})
