const express = require('express');

const router = express.Router();

const postDB = require('./postDb');

router.get('/posts', (req, res) => {
    postDB.get()
    .then(post=>{res.status(200).json(post)})
    .catch(err=>{res.status(500).json({err:'this did not go well'})})
});

router.get('/posts/:id', (req, res) => {
    const id = req.params.id
    postDB.getById(id)
    .then(post=>{res.status(201).json(post)})
    .catch(err=>{res.status(500).json({err:'this did not go well'})})
});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;