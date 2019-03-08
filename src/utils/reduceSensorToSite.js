module.exports = {
    reduceSensorToSite: (sensorSiteID, sensor) => {
        return {
            name: sensor.sourceInfo.siteName,
            id: sensorSiteID,
            latitude: sensor.sourceInfo.geoLocation.geogLocation.latitude,
            longitude: sensor.sourceInfo.geoLocation.geogLocation.longitude,
            isFavorite: false,
            sensors: [
                {
                    id: sensor.name,
                    unit: sensor.variable.unit.unitCode,
                    unitDescription: sensor.variable.variableDescription,
                    measurements: sensor.values[0].value.sort(function(a,b){
                        return new Date(b.dateTime) - new Date(a.dateTime);
                        }).map(measurement=>{
                        return {
                            measuredValue: measurement.value,
                            dateMeasured: measurement.dateTime
                        }
                    })
                }
            ]
        }
    }
};