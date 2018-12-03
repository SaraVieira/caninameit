const getMaintainers = maintainers =>
  maintainers.map(maintainer => `${maintainer.name} - ${maintainer.email}`)

module.exports = ({ author, maintainers }) => {
  if (author) {
    if (author.name && author.url) {
      return `${author.name} - ${author.url}`
    }
    return `${author.name}`
  }

  return getMaintainers(maintainers).join('\n  ')
}
