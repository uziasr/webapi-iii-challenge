const express = require('express');

const router = express.Router();

const userDB = require('./userDb.js')

router.post('/users', validateUser,(req, res) => {
    userDB.insert(req.body)
    .then(user=>{res.status(200).json(user)})
    .catch(err=>{res.status(500).json({error:'could not be created'})})
});

router.post('/users/:id/posts', (req, res) => {
    const id = req.params.id
    userDB.getById(id)
    .then(users=>res.status(200).json(users))
    .catch(err=>res.status(500).json({error: 'something went wrong'}))
});

router.get('/users', (req, res) => {
    userDB.get()
    .then(users=>res.status(200).json(users))
    .catch(err=>res.status(500).json({error: 'something went wrong'}))
});

router.get('/users/:id', (req, res) => {
    const id = req.params.id
    userDB.getById(id)
    .then(users=>res.status(200).json(users))
    .catch(err=>res.status(500).json({error: 'something went wrong'}))
});

router.get('/users/:id/posts', (req, res) => {
    const id = req.params.id
    userDB.getUserPosts(id)
    .then(users=>res.status(200).json(users))
    .catch(err=>res.status(500).json({error: 'something went wrong'}))

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    //validates the user id on every request that expects a user id parameter

};

function validateUser(req, res, next) {
    //validates body on a request to create a new user
    ("name" in req.body)? next():res.status(400).json({error:"You need a name to create a user"})

};

function validatePost(req, res, next) {
    //validates the body on a request to create a new post

};

module.exports = router;
