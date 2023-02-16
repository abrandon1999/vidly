module.exports = (validator) => {
    return (req,res,next) => {
        const myResult = validator(req.body);
        if(myResult.error){
            return res.status(400).send(myResult.error.details[0].message);
        }
        next();
    } 
}