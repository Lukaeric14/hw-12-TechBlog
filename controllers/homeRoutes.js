const sequelize = require("../config/connection");
const { Posts, User, Comments } = require("../models");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    console.log("Getting all routes");
    // Get all posts and comments
    const postData = await Posts.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Gets data from posts
    const posts = postData.map((post) => post.get({ plain: true }));

    // Passes posts and session data into mustache
    res.render("home", {
      layout: "main",
      posts,
      logged_in: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get single post
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comments,
          attributes: ["comment"],
        },
      ],
    });

    // Gets data from single post
    const post = postData.get({ plain: true });

    console.log(post);

    // Passes post and session status to mustache
    res.render("single-post", {
      ...post,
      logged_in: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Redirects to homepage after login
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// Redirects to homepage after sign up
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;

//set
