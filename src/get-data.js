const getMaintaners = maintaners =>
	maintaners.map(maintaner => `${maintaner.name} - ${maintaner.email}`);

module.exports = {
	getAuthor(data) {
		if (data.author) {
			if (data.author.name && data.author.url) {
				return `${data.author.name} - ${data.author.url}`;
			}
			return `${data.author.name}`;
		}

		return getMaintaners(data.maintainers).join('\n  ');
	}
};
