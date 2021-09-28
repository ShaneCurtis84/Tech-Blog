const router = require("express").Router();
const { Post, User } = require("../models");
const withAuth = require("../utils/auth");

//Display dashboard

router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [{ model: User }],
      attributes: ["id", "title", "content", "created_at"],
      order: [["created_at", "DESC"]],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("dashboard", {
      posts,
      user_id: req.session.user_id,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// New Post Page

router.get("/new", withAuth, async (req, res) => {
  try {
    res.render("newpostpage", { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Edit Post Page

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      where: {
        id: req.params.id,
      },
      include: [{ model: User }],
      attributes: ["id", "title", "content", "created_at"],
    });
    const post = postData.get({ plain: true });
    res.render("editpostpage", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
