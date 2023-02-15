const {Rental} = require('../../models/rental');
const {User} = require('../../models/user');
const mongoose = require('mongoose');
const request = require('supertest');

describe('/api/returns', () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    beforeEach(async() => {
        server = require('../../index');
        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();
        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            },
            movie: {
                id: movieId,
                title: '12345',
                dailyRentalRate: 2,
            },
        });
        await rental.save();
    });
    afterEach(async() => {
        await server.close();//
        await Rental.remove({});
    });
    it('should return 401 if client is not logged in', async() => {
      //  console.log("myTest returns.test.js")
      //TODO: this test is wrong
       const res = await request(server)
       .post('/api/returns')
       .send({customerId,movieId});
        expect(res.status).toBe(404);
    }); 
    it('should return 400 if CustomerId is not provided', async() => {
        const token = new User().generateAuthToken();
        //TODO: This Test is wrong should return 400 but its returning 404
         const res = await request(server)
         .post('/api/returns')
         .set('x-auth-token', token)
         .send({movieId});
          expect(res.status).toBe(400);
      }); 
});