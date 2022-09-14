const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/authentication.js');

router.post('/', withAuth, async (req, res) => {
    return Post.create({
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.session.user_id,
      })
        .then((data) => res.json(data)).catch((error) => {
          console.error(error);
          res.status(500).json(error);
        });
});

router.put('/:id', withAuth, async (req, res) => {
    Post.update(
        {
          title: req.body.title,
          post_content: req.body.post_content,
        },
        {
          where: {
            id: req.params.id,
          },})
        .then((data) => {
          if (!data) {
            return;
          }
          res.json(data);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const [rows] = await Post.destroy({
            where: {
                id: req.params.id,
            },});
        if (rows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (error) {
        res.status(500).json(error);
    }
});    

module.exports = router;

//done