const { ApolloError } = require('apollo-server');

module.exports = {
	Query: {
        myFavoriteSites : async (root, { email, period }, { dataSources }) => {
            let userStarredSites = await dataSources.favoriteSites.getFavoriteSitesByEmail(email, period);
            let starredSites = new Array();

            await Promise.all(userStarredSites.map(site => dataSources.usgsSystem.getSiteBySiteCode(site.siteCode, period))).then(allSiteDetails => {
                allSiteDetails.map(site => {
                    starredSites.push(site);
                })
            });

            starredSites.forEach(site=>site.isFavorite = true);

            return starredSites;
        },
        whyThisHere: a=> {
            throw new ApolloError("Whooooooooaaa","418");
        },
        notFoundEndpoint:async (root, { }, { dataSources }) => {
            let userStarredSites = await dataSources.favoriteSites.getWrongSite();
            return userStarredSites;
        },
		sites: async (root, {stateCode, siteCode, siteType, status, period}, context) => {
            if(siteCode)
                return await context.dataSources.usgsSystem.getSiteBySiteCode(siteCode, period);
            else if (typeof stateCode == 'undefined')
                return new ApolloError('You must provide a state code or type of site to search for');
            else if(typeof siteType == 'undefined')
                return await context.dataSources.usgsSystem.getSitesByStateCode(stateCode, status, period);
            else 
                return await context.dataSources.usgsSystem.getSitesByStateCodeAndType(stateCode, siteType, status, period);
		},
	}
};