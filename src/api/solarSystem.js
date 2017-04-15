var solarSystemservice = require('../service/solarSystemService');

exports.get = function (req, res) {
    var solarSystemId = req.params.solarSystemId;
    var date = req.query.date;
    if (solarSystemId !== undefined && date !== undefined) {
        solarSystemservice.getHours(solarSystemId, date, (err, data) => {
            if (err) {
                res.status(getStatusCode(err)).send(err.message);
            }
            else {
                res.send(data);
            }
        });
    }
    else {
        res.status(400).send('Invalid request');
    }
};

exports.getLiveSolarSystemInfo = function (req, res) {
    solarSystemservice.getLiveSolarSystemInfo((err, data) => {
        if (err) {
            res.status(getStatusCode(err)).send(err.message);
        }
        else {
            res.send(data);
        }
    });
};

exports.getReferenceData = function (req, res) {
    var solarSystemId = req.params.solarSystemId;
    var date = req.query.date;
    if (solarSystemId !== undefined && date !== undefined) {
        solarSystemservice.getReferenceDataById(solarSystemId, date, (err, data) => {
            if (err) {
                res.status(getStatusCode(err)).send(err.message);
            }
            else {
                res.send(data);
    }
    });
    }
    else {
        res.status(400).send('Invalid request');
    }
};

exports.getLiveData = function (req, res) {
    var solarSystemId = req.params.solarSystemId;
    var date = req.query.date;
    if (solarSystemId !== undefined && date !== undefined) {
        solarSystemservice.getLiveDataById(solarSystemId, date, (err, data) => {
            if (err) {
                res.status(getStatusCode(err)).send(err.message);
            }
            else {
                res.send(data);
    }
    });
    }
    else {
        res.status(400).send('Invalid request');
    }
};

var getStatusCode = (error) => {
    var statusCode = 500;
    if (error.statusCode !== undefined)
    {
        statusCode = error.statusCode;
    }
    return statusCode;
};