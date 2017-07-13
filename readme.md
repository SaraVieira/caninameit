# Can I name it ?
[![Build Status](https://travis-ci.org/SaraVieira/caninameit.svg?branch=master)](https://travis-ci.org/SaraVieira/caninameit)

A cli tool to help you see a npm name is already taken because this a problem now 😱

## Install

```
$ npm install --global caninameit
```

```
$ yarn global caninameit
```

## Examples

```
$ caninameit --help

  Usage
    caninameit [input] {--flag}

  Examples
    $ caninameit react
     > Damn it, the name is already taken ☹️

		 It was created by:
		   Jason Miller

		 It's at version:
		   8.2.1

		 You can find it at:
		   https://www.npmjs.com/package/preact

	 $ caninameit react --idc
 	 > Damn it, the name is already taken ☹️

	 $ caninameit wtv-name-you-want
    > NICE! The name is not taken you can claim it! 🍕 🎉🎉🎉
```


## TODO
	- Add publish flag to auto publish a package and secure your name


## License

MIT © [Sara Vieira](https://github.com/SaraVieira)
