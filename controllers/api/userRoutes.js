const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

//Get All Users
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get User By id

router.get("/user/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      where: {
        id: req.params.id,
      },
      include: [{ model: Post }, { model: Comment }],
    });

    if (!userData) {
      res.status(404).json({ message: "No post found with that id" });
      return;
    }

    const post = userData.get({ plain: true });
    res.render("singlepost", { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Sign up a new user

router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.status(200).json({ user: userData, message: "Sign Up Successful!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!userData) {
      res.status(400).json({ message: "Incorrect username or password" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect username or password" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = userData.username;
      req.session.user_id = userData.id;

      res
        .status(200)
        .json({ user: userData, message: "Logged In Succesfully!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
