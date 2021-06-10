// const router = require('express').Router();
// const Joi = require('joi');
// const NotFoundError = require('../errors/not-found-error');
// const InvalidRequestBodyError = require('../errors/invalid-request-body-error');
// const Group = require('../models').Group;
// const User = require('../models').User;
// const Exercise = require('../models').Exercise;
// const ExerciseType = require('../models').ExerciseType;
// const Set = require('../models').Set;



// router.get('/', (req, res, next) => {
//   Group.findAll({ raw: true })
//     .then(groups => res.json(groups))
//     .catch(next);
// });


// router.get('/:id', (req, res, next) => {
//   Group.findById(req.params.id)
//     .then((group) => {
//       if (!group) {
//         throw new NotFoundError('Group not found');
//       }

//       res.json(group.toJSON());
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
//     Group.create(req.body)
//       .then(group => res.json(group.toJSON()))
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
//     Group.findById(req.params.id)
//       .then((group) => {
//         if (!group) {
//           throw new NotFoundError('Group not found');
//         }

//         return group.update(req.body);
//       })
//       .then(group => res.json(group.toJSON()))
//       .catch(next);
//   }
// });


// router.delete('/:id', (req, res, next) => (
//   Group.destroy({ where: { id: req.params.id } })
//     .then((numDeletedGroups) => {
//       if (numDeletedGroups === 0) {
//         throw new NotFoundError('Group not found');
//       }

//       res.sendStatus(204);
//     })
//     .catch(next)
// ));


// router.get('/:id/members', (req, res, next) => (
//   Group.findAll({ where: { id: req.params.id }, include: [User] })
//     .then((groups) => {
//       const group = groups[0];
//       if (!group) {
//         throw new NotFoundError('Group not found');
//       }

//       res.json(group.toJSON().Users);
//     })
//     .catch(next)
// ));


// router.post('/:id/members', (req, res, next) => {
//   const { error } = Joi.validate(req.body, {
//     userId: Joi.number().required(),
//   });

//   if (error) {
//     next(new InvalidRequestBodyError());
//   } else {
//     Group.findById(req.params.id)
//       .then((group) => {
//         if (!group) {
//           throw new NotFoundError('Group not found');
//         }

//         return group.addUser(req.body.userId);
//       })
//       .then(() => res.sendStatus(204))
//       .catch(next);
//   }
// });


// router.delete('/:groupId/members/:userId', (req, res, next) => {
//   Promise.all([
//     Group.findById(req.params.groupId),
//     User.findById(req.params.userId),
//   ])
//     .then((result) => {
//       const group = result[0];
//       const user = result[1];

//       if (!group) {
//         throw new NotFoundError('Group not found');
//       }
//       if (!user) {
//         throw new NotFoundError('User not found');
//       }

//       return group.removeUser(req.params.userId);
//     })
//     .then(() => res.sendStatus(204))
//     .catch(next);
// });


// router.get('/:id/exercises', (req, res, next) => {
//   Group.findAll({
//     where: { id: req.params.id },
//     include: [{
//       model: User,
//       include: [{
//         model: Exercise,
//         include: [Set, ExerciseType, User],
//       }],
//     }],
//   })
//     .then((groups) => {
//       const group = groups[0];
//       if (!group) {
//         throw new NotFoundError('Group not found');
//       }

//       // array in which each entry is another array containing the exercises of an user
//       const exercisesOfUsers = group.Users.map(user => user.Exercises);
//       // flatten exercisesOfUsers array --> result is an array with all exercises of the group
//       const exercises = [].concat(...exercisesOfUsers);

//       res.json(exercises.map(exercise => ({
//         id: exercise.id,
//         note: exercise.note,
//         createdAt: exercise.createdAt,
//         updatedAt: exercise.updatedAt,
//         user: exercise.User,
//         exerciseType: exercise.ExerciseType,
//         sets: exercise.Sets,
//       })));
//     })
//     .catch(next);
// });

// module.exports = router;