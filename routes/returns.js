const express = require('express');
const router = express.Router();

router.use(express.json());
router.post('/', (req,res,next) => {
    if(!req.body.customerId) return res.status(400).send("customerId Not Provided")
    if(!req.body.movieId) return res.status(400).send("movieId Not Provided")
    res.status(401).send('Unauthorized');
});

module.exports = router;