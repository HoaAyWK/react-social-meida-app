const express = require('express');
const multer = require('multer');

const postController = require('../controllers/post');
const checkAuth = require('../middlewares/check-auth');

const router = express.Router();

router.get('/:id', postController.getAPost);
router.get('/:userId'/ postController.getAllUserPost);
router.post('/', checkAuth, postController.createNewPost);
router.patch('/:id', checkAuth, postController.updateAPost);
router.patch('/:id/like', checkAuth, postController.likeOrDislikeAPost);
router.delete('/:id', checkAuth, postController.deleteAPost);

module.exports = router;