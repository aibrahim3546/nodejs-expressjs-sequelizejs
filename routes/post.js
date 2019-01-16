const express = require('express');

const router = express.Router();
const { postController } = require('../controllers');

const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = postController;

/* GET POSTS */
router.get('/', getPosts);

/* GET POST */
router.get('/:id', getPost);

/* CREATE POST */
router.post('/', createPost);

/* UPDATE POST */
router.patch('/:id', updatePost);

/* DELETE POST */
router.delete('/:id', deletePost);

module.exports = router;
