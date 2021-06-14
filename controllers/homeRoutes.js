const router = require('express').Router();
const { User, Blog , Workout, Exercise} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('blogPost/:id', async (req, res) => {
  try {

      const blogData = await Blog.findByPk(req.params.id, {
          include: [{
              model: User,
          },
          {
              model: Comment,
              include: [{
                  model:User,
              }],
              order: [['id', 'DESC']],
          }],
          order: [['id', 'DESC']],
      });
  
      const blog = blogData.get({ plain: true });

      let allowEdit;
      if (blog.user_id == req.session.user_id) {
          allowEdit = true;
      } else {
          allowEdit = false;
      }
  
      res.render('blog', {
        ...blog,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
        allowEdit
      });
    } catch (err) {
      res.status(500).json(err);
    }
})

// Use withAuth middleware to prevent access to route
router.get('/blog', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('blog', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// // Prevent non logged in users from viewing the homepage
// router.get('/', withAuth, async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['name']],
//     });

//     const users = userData.map((blog) => blog.get({ plain: true }));

//     res.render('login', {
//       users,
//       // Pass the logged in flag to the template
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('blog');
    return;
  }

  res.render('login');
});

// Stats
router.get('/user/:id', withAuth, async (req, res) => {
  try {
      const user = await User.findByPk(req.params.id, {
          include: [
              {
                  model: Stats
              },
              {
                  model: Blog
              },
          ],
      });
  
      const users = user.get({ plain: true});
      res.render('user', {
          ...users,
          logged_in: req.session.logged_in 
      });
  } catch (err) {
      res.status(500).json(err);
  }
  
});

router.get('/exercises/:id', withAuth,  async (req, res) => {
  try {
      const workoutExercises = await Exercise.findAll({
          where: {
              workout_id: req.params.id
          }
      })
      const id = req.params.id
  
      const exercises = workoutExercises.map((exercise) => exercise.get({ plain: true}));

      res.render('exercises', {
        exercises,
        id,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id
      });
    } catch (err) {
      res.status(500).json(err);
  }
})
router.get('/userWorkouts/:id', withAuth,  async (req, res) => {
  try {
      const userWorkouts = await Workout.findAll({
          where: {
              user_id: req.params.id
          },
          order: [['id', 'DESC']]
      })
      const id = req.params.id
  
      const workouts = userWorkouts.map((workout) => workout.get({ plain: true}));

      res.render('userWorkouts', {
        workouts,
        id,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id
      });
    } catch (err) {
      res.status(500).json(err);
  }
})

router.get('/newWorkout', withAuth,  async (req, res) => {
  try {
      const workoutExercises = await Exercise.findAll()
  
      const exercises = workoutExercises.map((exercise) => exercise.get({ plain: true}));

      res.render('newWorkout', {
          exercises,
          logged_in: req.session.logged_in,
          user_id: req.session.user_id
      });
    } catch (err) {
      res.status(500).json(err);
    }
})



module.exports = router;
