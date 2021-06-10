const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');


// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name']],
    });

    const users = userData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      users,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
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


module.exports = router;
