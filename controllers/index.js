const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
//const userProfile = require('./userProfile.js');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
//router.use('/userprofile' , userProfile)

module.exports = router;