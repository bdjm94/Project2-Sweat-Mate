const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const blogRoutes = require('./api/blogRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/blogPost', blogRoutes);

module.exports = router;
