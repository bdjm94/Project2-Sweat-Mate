const router = require('express').Router();


const users = require('./users');
const groups = require('./groups');
const exercises = require('./exercises');
const exerciseTypes = require('./exercise-type');



router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use('/users', users);
router.use('/groups', groups);
router.use('/exercises', exercises);
router.use('/exercise-types', exerciseTypes);

// catch 404 and forward to error handler
router.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
router.use((err, req, res,) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = router;