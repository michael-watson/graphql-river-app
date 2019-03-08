module.exports = {
    reduceSensor: (sensor) => {
        return {
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
    }
};