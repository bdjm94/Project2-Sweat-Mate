const router = require('express').Router();
const userRoutes = require('./userRoutes');
const homepageRoutes = require('./homepageRoutes');

router.use('/users', userRoutes);
router.use('/blogs', homepageRoutes);

module.exports = router;