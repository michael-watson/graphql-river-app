const { ApolloError } = require('apollo-server');

module.exports = {
	Mutation: {
		favoriteSite: async (root, { email, siteCode, isFavorite }, { dataSources }) => {
            if (typeof email == 'undefined' || typeof siteCode == 'undefined')
                return new ApolloError('You must provide an email, siteCode and whether it isFavorite');
            
            return await dataSources.favoriteSites.postFavoriteSiteState(email,siteCode,isFavorite);
		},
	}
};