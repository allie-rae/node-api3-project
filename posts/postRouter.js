const express = require('express');
const Posts = require('./postDb');
const router = express.Router();

router.get('/', (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Posts could not be retrieved from the database." });
    });
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  Posts.getById(id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Posts could not be retrieved from the database." });
    })
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  Posts.remove(id)
    .then()
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Post could not be removed from the database." });
    })
});

router.put('/:id', validatePostId, (req, res) => {
  let id = req.params.id;
  let changes = req.body;
  Posts.update(id, changes)
    .then(count => {
      Posts.getById(id)
        .then(post => {
          res.status(200).json(post)
        })
        .catch(err => {
          console.log(err);
        })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error updating post in database." });
    })
});

// custom middleware

function validatePostId(req, res, next) {
  let id = req.params.id;
  Posts.getById(id)
    .then(post => {
      !post
        ? res.status(404).json({ errorMessage: "Post ID does not exist." })
        : next();
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = router;
