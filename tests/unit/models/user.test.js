const {User} = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('user.generateAuthToken', () => {
    it('should return a valid JWT', () => {
        const payload = {_id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true}
       // console.log(payload)
        const user = new User(payload);
        //console.log(user)
        const token = user.generateAuthToken();
        //console.log(token)
       // console.log(process.env.NODE_ENV)
        const decoded = jwt.verify(token,config.get('jwtPrivateKey'));
        //console.log(decoded)
        expect(decoded).toMatchObject(payload);
    })
})