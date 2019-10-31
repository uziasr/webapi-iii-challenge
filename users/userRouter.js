const express = require('express');

const router = express.Router();

const userDB = require('./userDb.js')

const postDB = require('../posts/postDb.js')

router.post('/users', validateUser,(req, res) => {
    userDB.insert(req.body)
    .then(user=>{res.status(200).json(user)})
    .catch(err=>{res.status(500).json({error:'could not be created'})})
});

router.post('/users/:id/posts', validateUserId, validatePost ,  (req, res) => {
    const id = req.params.id
    // console.log(id, req.body)
    const updatedBody = {...req.body, user_id:id} 
    console.log(updatedBody)
    postDB.insert(updatedBody)
    .then(users=>res.status(200).json(users))
    .catch(err=>{
        console.log(err)
        res.status(500).json({error: 'something went wrong!'})})
});

router.get('/users', (req, res) => {
    userDB.get()
    .then(users=>res.status(200).json(users))
    .catch(err=>res.status(500).json({error: 'something went wrong'}))
});

router.get('/users/:id', validateUserId,(req, res) => {
    const id = req.params.id
    userDB.getById(id)
    .then(users=>res.status(200).json(users))
    .catch(err=>res.status(500).json({error: 'something went wrong'}))
});

router.get('/users/:id/posts', validateUserId, (req, res) => {
    const id = req.params.id
    userDB.getUserPosts(id)
    .then(users=>res.status(200).json(users))
    .catch(err=>res.status(500).json({error: 'something went wrong'}))

});

router.delete('/users/:id',  validateUserId, (req, res) => {
    const id = req.params.id
    userDB.remove(id)
    .then(count=>{
        res.status(200).json({success: 'user successfully removed!'})
    })
    .catch(err=>{res.status(500).json({error:"use was not deleted;"})})
});

router.put('/users/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    const update = req.body;
    userDB.update(id, update)
    .then(count=>{res.status(200).json(req.body)})
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:"user could not be updated"})
    })

});

//custom middleware

function validateUserId(req, res, next) {
    //validates the user id on every request that expects a user id parameter
    userDB.getById(req.params.id)
.then(count=>count?next():res.status(404).json({error:"This user ID is not valid"}))
};

function validateUser(req, res, next) {
    //validates body on a request to create a new user
    ("name" in req.body)? next():res.status(400).json({error:"You need a name to create a user"})

};

function validatePost(req, res, next) {
    //validates the body on a request to create a new post
    console.log(isNaN(req.params.id))
    return (!isNaN(req.params.id) & "text" in req.body)? next():res.status(400).json({error:"You need a user id and text for post"})

};

module.exports = router;
