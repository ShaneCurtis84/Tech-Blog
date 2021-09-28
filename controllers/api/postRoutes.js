const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// New Post
router.post("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json({ postData, message: "Post created" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Edit a Post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!postData) {
      res.status(404).json({ message: "Unable to find post" });
      return;
    }
    res.status(200).json({ message: `Updated post id #${req.params.id}` });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a Post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "Unable to find post" });
      return;
    }

    res
      .status(200)
      .json({ message: `Post id #${req.params.id} has been removed` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
