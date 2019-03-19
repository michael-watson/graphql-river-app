require('dotenv').config();

const resolvers = require('./resolvers/');
const FavoriteSites = require('./datasources/favoriteSites');
const UsgsRestSource = require('./datasources/usgsRestSource');
const { ApolloServer } = require('apollo-server');

const fs = require('fs');
const path =require('path');
const typeDefs = [fs.readFileSync(path.join(__dirname, "./schema.graphql"), "utf8")];

const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => ({
		favoriteSites: new FavoriteSites(),
		usgsSystem: new UsgsRestSource()
	}),
	plugins: [
		require('apollo-server-plugin-operation-registry')({
			forbidUnregisteredOperations: true
		}),
	],
});

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});