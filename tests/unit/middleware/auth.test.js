const {User} = require('../../../models/user');
const auth = require('../../../middleware/auth');
const { JsonWebTokenError } = require('jsonwebtoken');
describe('auth middleware', () => { //<<--------------1
    it('should populate req.user with the payload of a valid JWT', () => {
        const token = new User().generateAuthToken();

        const req = { //<<----------3
            header: jest.fn().mockReturnValue(token) //<<---
        };
        const res = {}; //<------
        const next = jest.fn(); //<<----4
        auth(req,res,next); //<<----2
        expect(req.user).toBeDefined();
    });
});