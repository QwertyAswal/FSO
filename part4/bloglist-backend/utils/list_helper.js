const dummy = (blogs) => {
	return blogs.length - (blogs.length - 1)
}

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return sum + (item.likes | 0)
	}
	return blogs.reduce(reducer, 0)
}

module.exports = {
	dummy,
	totalLikes
}