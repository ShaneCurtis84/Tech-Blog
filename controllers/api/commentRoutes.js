const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require('../../utils/auth');

// Get all comments

router.get("/", async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            order: [
                ['date_created', 'DESC'],
            ],
        });
        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Post A Comment
router.post('/', withAuth, async (req, res) => {
    try {
        if (req.session) {
            const commentData = await Comment.create({
                comment_content: req.body.comment_content,
                post_id: req.body.post_id,
                user_id: req.session.user_id,
            });

            res.status(200).json(commentData);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});





module.exports = router;