const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', (req,res,next) => {
    console.log("AAAAAAAaaaa")
    res.status(401).send('Unauthorized');
});

module.exports = router;