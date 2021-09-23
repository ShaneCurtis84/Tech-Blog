const router = require("express").Router();
const { Post, User } = require("../models");

// Get All Posts
router.get("/", async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [{ model: User }],
        attributes: [
          'id',
          'title',
          'content',
          'date_created'
        ],
      });
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render("homepage", {
        posts,
        loggedIn: req.session.loggedIn
      });
    } catch (er) {
      response.status(500).json(err);
    }
  });



  // Get Sign Up Page
router.get("/signup", (request, response) => {
  response.render("signup")
});

// Get Log In Page
router.get("/login", (request, response) => {
  response.render("login")
});

module.exports = router;