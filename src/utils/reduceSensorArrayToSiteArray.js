const { reduceSensor } = require('../utils/reduceSensor');
const { reduceSensorToSite } = require('../utils/reduceSensorToSite');

module.exports = {
    reduceSensorArrayToSiteArray: (sensors) => {
        let sites = [];

        sensors.value.timeSeries.map(sensor=>{
            let agencyCode = sensor.sourceInfo.siteCode[0].agencyCode;
            let siteCodeValue = sensor.sourceInfo.siteCode[0].value;
            let sensorSiteID = `${agencyCode}:${siteCodeValue}`;

            let siteDupCheck = sites.findIndex(function(site) {
                return site.id === sensorSiteID;
            });
            if(siteDupCheck > -1) {
                sites[siteDupCheck].sensors.push(reduceSensor(sensor));
            } else {
                
                sites.push(reduceSensorToSite(sensorSiteID, sensor));
            }
        });

        return sites;
    }
}