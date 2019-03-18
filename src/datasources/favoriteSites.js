const { RESTDataSource } = require('apollo-datasource-rest');

module.exports = class FavoriteSites extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:4001/';
    }

    async postFavoriteSiteState(email, siteCode, isFavorite) {
        try {
            if(isFavorite) {
                let body = {
                    "siteCode": siteCode,
                    "email": email
                };
                return await this.post(`favoriteSites`, body);
            } else {
                return await this.deleteFavoriteSite(`${email}-${siteCode}`);
            } 
        } catch (err) {
            if(err.extensions.response.status === 404) {
                return {};
            } else if(err.extensions.response.status === 500) {
                return await this.getFavoriteSiteById(`${email}-${siteCode}`);
            } else {
                throw err;
            }
        }
    }
    async getFavoriteSitesByEmail(email) {
        return await this.get(`favoriteSites?email=${email}`);
    }
    async deleteFavoriteSite(id) {
        return await this.delete(`favoriteSites/${id}`);
    }
    async getFavoriteSiteById(id){
        return await this.get(`favoriteSites/${id}`);
    }
    async throwThatNotFoundError() {
        return await this.get(`throwThatError/`);
    }
};