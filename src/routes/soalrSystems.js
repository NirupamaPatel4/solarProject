var express = require('express');
var router = express.Router();

var solarSystemapi = require('../api/solarSystem');

// router.get('/solarSystem/:solarSystemId', solarSystemapi.getReferenceData);
// router.get('/liveSolarSystems/:solarSystemId', solarSystemapi.getLiveData);
router.get('/solarSystems/:solarSystemId', solarSystemapi.get);
router.get('/solarSystems', solarSystemapi.getLiveSolarSystemInfo);
router.post('/solarSystems/register', solarSystemapi.register);
router.post('/solarSystems/:solarSystemId', solarSystemapi.post);

module.exports = router;
