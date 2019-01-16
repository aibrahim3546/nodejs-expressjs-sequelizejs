const db = require('../models');

const getPosts = (req, res) => {
  db.Post.findAll({}).then((posts) => {
    res.json(posts);
  }).catch((err) => {
    throw err;
  });
};

const getPost = (req, res) => {
  db.Post.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: db.User,
        as: 'user',
        attributes: {
          exclude: ['password'],
        },
      },
    ],
  }).then((post) => {
    res.json(post);
  }).catch((err) => {
    res.status(500).send({ error: err });
    throw err;
  });
};

const createPost = (req, res) => {
  db.Post.create({
    ...req.body,
  }).then((post) => {
    res.json(post);
  }).catch((err) => {
    res.status(500).send({ error: err });
  });
};

const updatePost = (req, res) => {
  const { id } = req.params;
  db.Post.update(
    req.body,
    {
      where: {
        id,
      },
    },
  ).then(() => {
    db.Post.findOne({
      where: {
        id,
      },
    }).then((post) => {
      res.json(post);
    }).catch((err) => {
      res.status(500).send({ error: err });
      throw err;
    });
  }).catch((err) => {
    res.status(500).send({ error: err });
  });
};

const deletePost = (req, res) => {
  const { id } = req.params;
  db.Post.destroy(
    {
      where: {
        id,
      },
    },
  ).then(() => {
    res.status(200).send({ message: 'success' });
  }).catch((err) => {
    res.status(500).send({ error: err });
  });
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
