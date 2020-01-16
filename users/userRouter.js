const express = require('express');
const Users = require('./userDb');
const router = express.Router();

router.get('/', (req, res) => {
  Users.get()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error while retrieving user information." })
    });
});

// router.post('/:id/posts', (req, res) => {
//   let resource = req.body;
//   let text = req.body.text;
//   let user_id = req.params.id;
//   req.body.user_id = user_id;
//   console.log(resource)
//   !text
//     ? res.status(404).json({ errorMessage: "Missing body text." })
//     : Posts.insert(resource)
//       .then(response => {
//         res.status(201).json(response)
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({ errorMessage: "Post could not be saved to database." })
//       });
// });

router.post('/', (req, res) => {
  let user = req.body;
  Users.insert(user)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ errorMessage: "Error posting user to database." });
  });
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  Users.getById(id)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ errorMessage: "Error retrieving user from database."});
  });
});

router.get('/:id/posts', (req, res) => {
  let id = req.params.id;
  Users.getUserPosts(id)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ errorMessage: "Error retrieving posts from database."});
  });
});

router.delete('/:id', (req, res) => {
  id = req.params.id;
  Users.remove(id)
  .then(user => {
    res.status(200).json({ message: "The user has been deleted."});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ errorMessage: "Error deleting user from database."});
  });
});

router.put('/:id', (req, res) => {
  let id = req.params.id;
  let changes = req.body;

  Users.update(id, changes)
  .then(user => {
    res.status(200).json({ errorMessage: "User was updated."});
  })
  .catch(err => {
    res.status(500).json({ errorMessage: "Error updating user in database." });
  });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
