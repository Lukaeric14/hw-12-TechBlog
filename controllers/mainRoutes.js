const router = require("express").Router();
const sequelize = require("../config/connection");
const { Posts, User, Comments } = require("../models");
const withAuth = require("../utils/authentication");

router.get("/", withAuth, async (req, res) => {
  try {
    console.log("opening dashboard");
    const postData = await Posts.findAll({
      where: {
        user_id: req.session.userId,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);

    res.render("all-posts-admin", {
      layout: "main",
      posts,
    });
  } catch (err) {
    console.log(err);
    res.redirect("login");
  }
});

// Enter a new post
router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {
    layout: "main",
  });
});

// Edit a specific post
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render("edit-post", {
        layout: "dashboard",
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect("login");
  }
});

module.exports = router;

//set
