const router = require("express").Router();
const { Post, User, Comment } = require("../models");

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

// Get Individual Posts


router.get('/post/:id', async (req, res) => {
  try {
      const postData = await Post.findByPk(req.params.id, {
          where: {
              id: req.params.id,
          },
          attributes: [
              'id',
              'title',
              'content',
              'date_created'
          ],
          include: [
              {
                  model: User,
                  attributes: ['username'],
              },
              {
                  model: Comment,
                  attributes: [
                      'id',
                      'comment_content',
                      'post_id',
                      'user_id',
                      'date_created'
                      
                  ],
                  include: {
                      model: User,
                      attributes: ['username'],
                  },
              },
          ],
      });
      if (!postData) {
          res.status(404).json({ message: 'No post found with that id' });
          return;
      }
      const post = postData.get({ plain: true });
      res.render('singlepost', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
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