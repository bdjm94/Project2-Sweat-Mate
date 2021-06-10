// const router = require('express').Router();
// const ExerciseType = require('../models').ExerciseType;
// const Joi = require('joi');
// const NotFoundError = require('../errors/not-found-error');
// const InvalidRequestBodyError = require('../errors/invalid-request-body-error');



// router.get('/', (req, res, next) => {
//   ExerciseType.findAll({ raw: true })
//     .then(exerciseTypes => res.json(exerciseTypes))
//     .catch(next);
// });


// router.get('/:name', (req, res, next) => {
//   ExerciseType.findById(req.params.name)
//     .then((exerciseType) => {
//       if (!exerciseType) {
//         throw new NotFoundError('Exercise type not found');
//       }

//       res.json(exerciseType.toJSON());
//     })
//     .catch(next);
// });


// router.post('/', (req, res, next) => {
//   const { error } = Joi.validate(req.body, {
//     name: Joi.string().min(1).required(),
//   });

//   if (error) {
//     next(new InvalidRequestBodyError());
//   } else {
//     ExerciseType.findOrCreate({ where: { name: req.body.name } })
//       .spread(exerciseType => res.json(exerciseType.toJSON()))
//       .catch(next);
//   }
// });


// router.delete('/:name', (req, res, next) => {
//   ExerciseType.destroy({ where: { name: req.params.name } })
//     .then((numDeletedRows) => {
//       if (numDeletedRows === 0) {
//         throw new NotFoundError('Exercise type not found');
//       }

//       res.sendStatus(204);
//     })
//     .catch(next);
// });

// module.exports = router;