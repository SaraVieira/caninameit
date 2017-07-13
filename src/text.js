const text = {
	error: 'Damn it, the name is already taken ☹️',
	usage: `
		Usage
		  $ canisuseit [input]

		Examples
		  $ canisuseit lodash
		   > No this name is already taken
	`,
	noParams: '\nYou need to pass a package name so I can do my thing 😉',
	success: 'NICE! The name is not taken you can claim it! 🍕 🎉🎉🎉'
};

const getText = type => text[type];

module.exports = getText;
