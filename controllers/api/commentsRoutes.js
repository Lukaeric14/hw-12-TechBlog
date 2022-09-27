const router = require("express").Router();
const { Comments } = require("../../models");
const withAuth = require("../../utils/authentication");

router.post("/", withAuth, async (req, res) => {
  console.log(req.body);
  Comments.create({
    comment: req.body.comment,
    post_id: req.body.post_id,
    user_id: req.session.userId,
  })

    .then((cmmnt) => res.json(cmmnt))

    .catch((error) => {
      res.status(400).json(error);
    });
});

module.exports = router;

//done
