const { reduceSensor } = require('./reduceSensor');

module.exports = {
    reduceSiteWithSensors: (site) => {
        const mainSensor = site.timeSeries[0];
        const siteIdArray = mainSensor.name.split(':');
        return {
            name: mainSensor.sourceInfo.siteName,
            id: `${siteIdArray[0]}:${siteIdArray[1]}`,
            latitude: mainSensor.sourceInfo.geoLocation.geogLocation.latitude,
            longitude: mainSensor.sourceInfo.geoLocation.geogLocation.longitude,
            sensors: site.timeSeries.map(reduceSensor)
        }
    }
};