require('dotenv').config();

const resolvers = require('./resolvers/');
const FavoriteSites = require('./datasources/favoriteSites');
const UsgsRestSource = require('./datasources/usgsRestSource');
const { ApolloServer } = require('apollo-server');

const fs = require('fs');
const path = require('path');
const typeDefs = [fs.readFileSync(path.join(__dirname, "./schema.graphql"), "utf8")];

const favoriteSites = new FavoriteSites();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => ({
		favoriteSites: favoriteSites,
		usgsSystem: new UsgsRestSource()
	}),
	engine: {
		schemaTag: process.env['SCHEMA_TAG']
	}
	// context: async ({ req }) => {
	// 	try {
	// 		let test = await favoriteSites.getFavoriteSitesByEmail("michaelwatson93@gmail.com");
	// 		console.log(req);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// 	return req;
	// }
});

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});