var pg = require('pg');
var conString = "postgres://postgres:abcd1234@localhost:5432/test";
var _ = require('lodash');

function query(sql, params, callback) {
    pg.connect(conString, function(err, client, done) {
        if (err) {
            done(); // release client back to pool
            callback(err);
            return;
        }
        client.query(sql, params, function(err, result){
            if (err) {console.error(err+'\nQuery: '+sql); done(); callback(); return;}
            done();
            callback(null,result);
        });
    });
}


// returns solar object if found, else returns undefined
exports.findById = function(id, callback) {
    var sql = `SELECT * FROM solarsystem WHERE id = $1`;

    query(sql, [id], function(err, result) {
        if (err) return callback(err);
        callback(null, result.rows[0]);
    });
};

exports.findByIdAndDate = function(solarsystemid, date, callback) {
    var sql = `SELECT * FROM livesolarsystem 
                WHERE solarsystemid = $1 and date >= to_timestamp($2, 'DD-MM-YYYY')
                and date < (to_timestamp($2, 'DD-MM-YYYY') + '1 day'::interval) order by date`;

    query(sql, [solarsystemid, date], function(err, result) {
        if (err) return callback(err);
        callback(null, result.rows);
    });
};

exports.getInfo = function(callback) {
    var sql = `SELECT distinct su.solarsystemid, su.email from livesolarsystem ls join solarsystemuserinfo su on ls.solarsystemid = su.solarsystemid`;

    query(sql, [], function(err, result) {
        if (err) return callback(err);
        callback(null, result.rows);
    });
};

exports.registerSystemInfo = function(solarsystemid, email, callback) {
  var sql = `INSERT INTO solarsystemuserinfo(solarsystemid, email) VALUES ($1, $2)`;
    query(sql, [solarsystemid, email], function(err, result) {
        if (err) return callback(err);
        callback(null, result.rows[0]);
    });
};

exports.InsertLiveData = function(solarsystemid, dcPowerData, callback) {
    var values = '';
    _.each(dcPowerData,function(data) {
        values = values + `(${solarsystemid}, '${data.date}', ${data.dcPower}),`
    });
    values = values.slice(0, -1);
    var sql = `INSERT INTO livesolarsystem(solarsystemid, date, dcpower) VALUES ${values}`;
    query(sql, [], function(err, result) {
        if (err) return callback(err);
        callback(null, result.rows);
    });
};
