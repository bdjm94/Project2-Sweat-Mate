// const router = require('express').Router();
// const Joi = require('joi');
// const NotFoundError = require('../errors/not-found-error');
// const InvalidRequestBodyError = require('../errors/invalid-request-body-error');
// const User = require('../models').User;
// const Group = require('../models').Group;
// const Exercise = require('../models').Exercise;
// const ExerciseType = require('../models').ExerciseType;
// const Set = require('../models').Set;


// router.get('/:id', (req, res, next) => {
//   User.findById(req.params.id)
//     .then((user) => {
//       if (!user) {
//         throw new NotFoundError('User not found');
//       }

//       res.json(user.toJSON());
//     })
//     .catch(next);
// });


// router.post('/', (req, res, next) => {
//   const { error } = Joi.validate(req.body, {
//     name: Joi.string().required(),
//   });

//   if (error) {
//     next(new InvalidRequestBodyError());
//   } else {
//     User.create({ name: req.body.name })
//       .then(user => res.json(user.toJSON()))
//       .catch(next);
//   }
// });

// router.patch('/:id', (req, res, next) => {
//   const { error } = Joi.validate(req.body, {
//     name: Joi.string().required(),
//   });

//   if (error) {
//     next(new InvalidRequestBodyError());
//   } else {
//     User.findById(req.params.id)
//       .then((user) => {
//         if (!user) {
//           throw new NotFoundError('User not found');
//         }

//         return user.update(req.body);
//       })
//       .then(user => res.json(user.toJSON()))
//       .catch(next);
//   }
// });


// router.delete('/:id', (req, res, next) => {
//   User.destroy({ where: { id: req.params.id } })
//     .then((numDeletedUsers) => {
//       if (numDeletedUsers === 0) {
//         throw new NotFoundError('User not found');
//       }

//       res.sendStatus(204);
//     })
//     .catch(next);
// });


// router.get('/:id/groups', (req, res, next) => {
//   User.findAll({ where: { id: req.params.id }, include: [Group] })
//     .then((users) => {
//       const user = users[0];
//       if (!user) {
//         next(new NotFoundError('User not found'));
//       }

//       res.json(user.Groups.map(group => ({
//         id: group.id,
//         name: group.name,
//         createdAt: group.createdAt,
//         updatedAt: group.updatedAt,
//       })));
//     })
//     .catch(next);
// });

// router.get('/:id/exercises', (req, res, next) => {
//   User.findAll({
//     where: { id: req.params.id },
//     include: [{
//       model: Exercise,
//       include: [Set, ExerciseType, User],
//     }],
//   })
//     .then((users) => {
//       const user = users[0];
//       if (!user) {
//         throw new NotFoundError('User not found');
//       }

//       res.json(user.Exercises.map(exercise => ({
//         id: exercise.id,
//         note: exercise.note,
//         createdAt: exercise.createdAt,
//         updatedAt: exercise.updatedAt,
//         user: exercise.User,
//         sets: exercise.Sets,
//         exerciseType: exercise.ExerciseType,
//       })));
//     })
//     .catch(next);
// });


// router.get('/:id/statistics', (req, res, next) => (
//   User.findById(req.params.id)
//     .then((user) => {
//       if (!user) {
//         throw new NotFoundError('User not found');
//       }

//       res.json({ totalWeightLifted: user.totalWeightLifted });
//     })
//     .catch(next)
// ));

// module.exports = router;