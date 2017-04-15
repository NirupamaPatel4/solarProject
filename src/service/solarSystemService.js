var solarSystemRepo = require('../repository/solarSystemRepository');
var _ = require('lodash');

exports.getHours = (solarSystemId, date, callback) => {
    console.log('getHours called in solarSystemService');
    getReferenceDataById(solarSystemId, (err, refData) => {
        if(err) return callback(err);
        getLiveDataById(solarSystemId, date, (err, liveData) => {
            if(err) return callback(err);
            calculateHours(refData,liveData,date, (err,result) => {
                callback(err, result);
            });
        });
    });
};

var getReferenceDataById = (solarSystemId, callback) => {
    console.log('getReferenceDataById called in solarSystemService');
    solarSystemRepo.findById(solarSystemId, (err, referenceData) => {
        if(err){
            callback(err);
        }
        if(referenceData !== undefined){
            var dcPowerArray = referenceData.dcpower.split(',');
            referenceData.dcpower = dcPowerArray;
            callback(err, referenceData);
        }
    });
};

var getLiveDataById = (solarSystemId, date, callback) => {
    console.log('getLiveDataById called in solarSystemService');
    solarSystemRepo.findByIdAndDate(solarSystemId, date, (err, liveData) => {
        if(err){
            callback(err);
        }
        if(liveData !== undefined){
            callback(err, liveData);
        }
    });
};

var calculateHours = (referenceData, liveData, date, callback) => {
    var s = date.split('-');
    var d1 = new Date(s[2], s[1], s[0]);
    var d2 = new Date(s[2], 1, 1);
    var start_index = Math.round((d1-d2)/(1000*60*60))-1;
    console.log('start_index: ', start_index);
    var result = [];
    var hour = 0;
    //console.log('liveData: ', liveData);
    _.each(liveData,function(data) {
        var limit = referenceData.dcpower[start_index+hour]*(80/100);
        if(data.dcpower < limit){
            //adding 5:30 hours to timestamp
            data.date = new Date(data.date).toString();
            result.push(data.date);
        }
        hour++;
    });
    callback(null,result);
}

exports.getLiveSolarSystemInfo = (callback) => {
    console.log('getLiveSolarSystemInfo called in solarSystemService');
    solarSystemRepo.getInfo((err, data) => {
        if(err) return callback(err);
        callback(err, data);
    });
};