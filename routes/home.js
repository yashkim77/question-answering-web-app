const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/',async (req,res) => {
    res.sendFile('views/questionAnswer.html' , {root: path.dirname(__dirname)});
});

module.exports = router;