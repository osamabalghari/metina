const jake = {
	id: '1',
	name: 'Back Log',
	buttonText: 'low priority',
	title: 'Company Website Redesign',
	avatarUrl: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
	colors: {
		soft: '#FFFAE6',
		hard: 'rgba(9, 30, 66, 0.71)'
	}
}

const BMO = {
	id: '2',
	name: 'In Progress',
	buttonText: 'high priority',
	title: 'Company Website Redesign',
	avatarUrl: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
	colors: {
		soft: '#FFFAE6',
		hard: 'rgba(9, 30, 66, 0.71)'
	}
}

const finn = {
	id: '3',
	name: 'Review',
	buttonText: 'med priority',
	title: 'Company Website Redesign',
	avatarUrl: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
	colors: {
		soft: '#FFFAE6',
		hard: 'rgba(9, 30, 66, 0.71)'
	}
}

const princess = {
	id: '4',
	name: 'Complete',
	buttonText: 'med priority',
	url: 'http://adventuretime.wikia.com/wiki/Finn',
	title: 'Company Website Redesign',
	avatarUrl: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
	colors: {
		soft: '#FFFAE6',
		hard: 'rgba(9, 30, 66, 0.71)'
	}
}
export const authors = [jake, BMO, finn, princess]

export const quotes = [
	{
		id: '1',
		content: 'Dashboard layout design',
		author: BMO
	},
	{
		id: '2',
		content: 'Company website redesign',
		author: jake
	},
	{
		id: '3',
		content: 'Company website redesign',
		author: finn
	},
	{
		id: '4',
		content: 'Company website redesign',
		author: princess
	}
]

// So we do not have any clashes with our hardcoded ones
let idCount = quotes.length + 1

export const getQuotes = (count) =>
	Array.from({length: count}, (v, k) => k).map(() => {
		const random = quotes[Math.floor(Math.random() * quotes.length)]

		const custom = {
			...random,
			id: `G${idCount++}`
		}

		return custom
	})

export const getAuthors = (count) =>
	Array.from({length: count}, (v, k) => k).map(() => {
		const random = authors[Math.floor(Math.random() * authors.length)]

		const custom = {
			...random,
			id: `author-${idCount++}`
		}

		return custom
	})

const getByAuthor = (author, items) => items.filter((quote) => quote.author === author)

export const authorQuoteMap: QuoteMap = authors.reduce(
	(previous, author) => ({
		...previous,
		[author.name]: getByAuthor(author, quotes)
	}),
	{}
)

export const generateQuoteMap = (quoteCount) =>
	authors.reduce(
		(previous, author) => ({
			...previous,
			[author.name]: getQuotes(quoteCount / authors.length)
		}),
		{}
	)
