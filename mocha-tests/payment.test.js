const request = require('supertest');
const app = require("../src/index");

describe('Testing getAllPayments endpoint', () => {
    it('should get all payments', (done) => {
      request(app)
        .post('/api/getpayments')
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
  
          if (!Array.isArray(res.body)) {
            return done(new Error('Response should contain an array of payments'));
          }

  
          done();
        });
    });
  
    it('should handle errors gracefully', (done) => {
      request(app)
        .post('/api/getpayments')
        .expect(400) 
        .end((err, res) => {
          if (err) return done(err);
          if (!res.body.hasOwnProperty('error')) {
            return done(new Error('Response should contain an error message'));
          }
  
          done();
        });
    });
  });