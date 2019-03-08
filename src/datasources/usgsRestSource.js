const { ApolloError } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');

const { reduceSiteWithSensors } = require('../utils/reduceSiteWithSensors');
const { reduceSensorArrayToSiteArray } = require('../utils/reduceSensorArrayToSiteArray');

module.exports = class UsgsRestSource extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://waterservices.usgs.gov/nwis/iv/';
    }

    async getSiteBySiteCode(siteCode, period="PT2H") {
        try {
            var code = siteCode.split(':');
            const results = await this.get(`?format=json&site=${code[0]}:${code[1]}&period=${period}`);
            return reduceSiteWithSensors(results.value);
        } catch (err) {
            if(err.extensions.response.status === 400) {
                throw new ApolloError("Bad formatted id. It should be {AgencyCode}:{SiteCode} (i.e. USGS:09423350)", 400);
            } else {
                throw err;
            }
        }
    }

    async getSitesByStateCode(stateCode, status = 'ALL', period="PT2H") {
        let sensors = await this.get(`?format=json&stateCd=${stateCode}&siteStatus=${status}&period=${period}`);
        return reduceSensorArrayToSiteArray(sensors);
    }

    async getSitesByStateCodeAndType(stateCode, siteType, status = 'ALL', period="PT2H") {
        let sensors = await this.get(`?format=json&stateCd=${stateCode}&siteType=${siteType}&siteStatus=${status}&period=${period}`);
        
        return reduceSensorArrayToSiteArray(sensors);
    }
};