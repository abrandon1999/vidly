const express = require('express');
const router = express.Router();


router.post('/', (req,res,next) => {
    console.log("You should see this message")
    res.status(401).send('Unauthorized');
});

module.exports = router;