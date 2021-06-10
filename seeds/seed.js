const sequelize = require('../config/connection');
const { User, Blog, Stats,  Workout, Exercise, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const statsData = require('./stats-seeds.json');
const workoutData = require('./workout-seeds.json');
const exerciseData = require('./exercise-seeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  const stats = await Stats.bulkCreate(statsData, {
    returning: true,
  });

  const workouts = await Workout.bulkCreate(workoutData, {
    returning: true,
  });

  const exercise = await Exercise.bulkCreate(exerciseData, {
    returning: true,
  });

  const comments = await Comment.bulkCreate(commentsData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
