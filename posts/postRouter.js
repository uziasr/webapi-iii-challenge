const express = require('express');

const router = express.Router();

const postDB = require('./postDb');

router.get('/posts', (req, res) => {
    postDB.get()
    .then(post=>{res.status(200).json(post)})
    .catch(err=>{res.status(500).json({err:'this did not go well'})})
});

router.get('/posts/:id', validatePostId, (req, res) => {
    const id = req.params.id
    postDB.getById(id)
    .then(post=>{res.status(201).json(post)})
    .catch(err=>{res.status(500).json({err:'this did not go well'})})
});

router.delete('/posts/:id', validatePostId, (req, res) => {
    const id = req.params.id
    postDB.remove(id)
    .then(count=>{
        // console.log(count)
        count? res.status(200).json({success:'post was deleted'}):
        res.status(400).json({error:'no posts were removed'})
    })
    .catch(err=>{res.status(500).json({error:'something went wrong'})})
});

router.put('/posts/:id', validatePostId ,(req, res) => {
    const id = req.params.id
    const update = req.body
    postDB.update(id, update)
    .then(count=>{
        count?res.status(200).json({success:'post was updated'}):
        res.status(400).json({error:'no posts were updated'})
    })
    .catch(err=>{res.status(500).json({error:'something went wrong'})})
});

// custom middleware

function validatePostId(req, res, next) {
postDB.getById(req.params.id)
.then(count=>count?next():res.status(404).json({error:"This post ID is not valid"}))
};

module.exports = router;