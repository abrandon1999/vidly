const {User} = require('../../../models/user');
const auth = require('../../../middleware/auth');
const mongoose = require('mongoose');


describe('auth middleware', () => { //<<--------------1
    it('should populate req.user with the payload of a valid JWT', () => {
        const user = {_id: mongoose.Types.ObjectId().toHexString(), isAdmin: true};
        const token = new User(user).generateAuthToken();

        const req = { //<<----------3
            header: jest.fn().mockReturnValue(token) //<<---
        };
        const res = {}; //<------
        const next = jest.fn(); //<<----4
        auth(req,res,next); //<<----2
        expect(req.user).toMatchObject(user);
    });
});