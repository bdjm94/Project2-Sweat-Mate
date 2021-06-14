const router = require('express').Router();
const { Blog, User } = require('../../models');
// const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create({
    ...req.body,
    user_id: req.session.user_id,
  });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
try {
  const blogData = await Blog.findByPk(req.params.id, {
    include: [{ model: User }]
// find one category by its `id` value
// be sure to include its associated Products
  });

  if (!blogData) {
  res.status(404).json({ message: 'No post found with this id!' });
  return;
  }

  res.status(200).json(blogData);
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/:id', (req, res) => {
  Blog.findOne({
          where: {
              id: req.params.id
          },
          attributes: ['id',
              'description',
              'name',
              'date_created'
          ],
      })
      .then(dbBlogData => {
          if (!dbBlogData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }
          res.json(dbBlogData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

module.exports = router;
