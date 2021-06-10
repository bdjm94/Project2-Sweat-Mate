const router = require('express').Router();
const userRoutes = require('./userRoutes');
const homepageRoutes = require('./homepageRoutes');

router.use('/users', userRoutes);
router.use('/homepage', homepageRoutes);

module.exports = router;