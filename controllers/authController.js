const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models');

const getUser = (req, res) => {
  const { username } = req.params;
  db.User.findOne({
    where: {
      username,
    },
    attributes: {
      exclude: ['password'],
    },
    include: [
      {
        model: db.Post,
        as: 'posts',
      },
    ],
  }).then((user) => {
    res.json(user);
  }).catch((err) => {
    res.status(500).send({ error: err });
  });
};

const loginUser = (req, res) => {
  const { username, password } = req.body;
  db.User.findOne({
    where: {
      username,
    },
  }).then((user) => {
    bcrypt.compare(password, user.password, (hashErr, isPassword) => {
      if (isPassword) {
        jwt.sign({
          payload: {
            id: user.id,
            username,
          },
        }, 'mysecretkey', (err, token) => {
          res.json({
            accessToken: token,
          });
        });
      } else {
        res.status(500).send({
          error: {
            message: 'Invalid password',
          },
        });
      }
    });
  }).catch(() => {
    res.status(500).send({
      error: {
        message: 'Invalid username',
      },
    });
  });
};

const registerUser = (req, res) => {
  const { password } = req.body;
  bcrypt.hash(password, 10, (hashErr, hash) => {
    if (hashErr) {
      res.send(hashErr);
    } else {
      db.User.create({
        ...req.body,
        password: hash,
      }).then((result) => {
        res.json(result);
      }).catch((err) => {
        const { errors, name } = err;
        const messages = [];
        if (errors.length > 0) {
          errors.forEach((each) => {
            messages.push(each.message);
          });
          res.status(500).send({
            error: {
              name,
              messages,
            },
          });
        } else {
          res.status(500).send({ error: err });
        }
      });
    }
  });
};

const updateUser = (req, res) => {
  const { username } = req.params;
  db.User.update(
    req.body,
    {
      returning: true,
      where: {
        username,
      },
    },
  ).then(() => {
    db.User.findOne({
      where: {
        username,
      },
      attributes: {
        exclude: ['password'],
      },
    }).then((user) => {
      res.json(user);
    }).catch((err) => {
      throw err;
    });
  }).catch((updateError) => {
    throw updateError;
  });
};

module.exports = {
  getUser,
  registerUser,
  loginUser,
  updateUser,
};
