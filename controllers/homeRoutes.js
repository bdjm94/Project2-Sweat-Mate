const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name']],
    });

    const users = userData.map((homepage) => homepage.get({ plain: true }));

    res.render('/homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/user/:id', auth, async (req, res) => {
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
