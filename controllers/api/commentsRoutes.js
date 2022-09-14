const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/authentication');

router.post('/', withAuth, async (req, res) => {
    Comment.create({
        comment_content: req.body.commentContent,
        post_id: req.body.postId,
        user_id: req.session.user_id,
      })

        .then((cmmnt) => res.json(cmmnt))
    
        .catch((error) => {
          res.status(400).json(error);
        });
});

module.exports = router;

//done