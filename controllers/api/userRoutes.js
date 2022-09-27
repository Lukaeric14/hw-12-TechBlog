const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const data = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = data.id;
      req.session.username = data.username;
      req.session.loggedIn = true;

      res.json(data);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = await User.findOne({ where: { username: req.body.username } });

    if (!data) {
      res.status(400).json({ message: "Incorrect username or password" });
      return;
    }

    const validPassword = await data.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect username or password" });
      return;
    }

    req.session.save(() => {
      req.session.userId = data.id;
      req.session.username = data.username;
      req.session.loggedIn = true;

      res.json({ user: data, message: "You are now logged in!" });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.post("/logout", (req, res) => {
  console.log("Logging out", req.session.loggedIn);
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

//done
