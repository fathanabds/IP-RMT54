const app = require('../app.js');
const { sequelize } = require('../models');
const request = require('supertest');
const { queryInterface } = sequelize;

const userData = {
  email: 'ziady@mail.com',
  password: '123456',
};

let googleToken =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM4OGQ4MDlmNGRiOTQzZGY1M2RhN2FjY2ZkNDc3NjRkMDViYTM5MWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDQxOTM1MjU5MzkxLTY2bHI5ZXJzaXJ2bDcwODA2dDlxbG9udjhuazRobGxlLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA0MTkzNTI1OTM5MS02NmxyOWVyc2lydmw3MDgwNnQ5cWxvbnY4bms0aGxsZS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwMzAyMjkyMDIwMzgwODQ4NTc0NiIsImVtYWlsIjoiYWJkdWxzaG9kaXFmYXRoYW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTczMDE5MjY1MCwibmFtZSI6IkZhdGhhbiBBYmR1bCBTaG9kaXEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSWVka3pDRG85YmRsQVptS3dxZmxpMlBjUHFPQUxpTWlCUWlRNi16MTMxTDZuVjF3PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkZhdGhhbiIsImZhbWlseV9uYW1lIjoiQWJkdWwgU2hvZGlxIiwiaWF0IjoxNzMwMTkyOTUwLCJleHAiOjE3MzAxOTY1NTAsImp0aSI6IjU0NDU3NjVkYWNjOWIyZTNkZTgzYTc3ZjU2MjM5MTY2NGVhNTdiZDQifQ.NWckPrJ9dXJwTwdp9jWJLU0rn6v5ia_5ez6Jl9Pk7QtpuJ_N0NFutCKZXo5aQlasCnSp3Kl0n2i_4pbN4iNmc7kigC45L016nVXJ7TOd7oxPpLvILqEzHoNPS8kPn6AeH0HDZDCllMtZYrI8gvwSzl9Y9V_uUs0q16z6yneRkED4hs6mYgnU4UJ3D0tK0RFw8TlWZeZ-ueVKus-Q5CgWLaoTPnfe8ghFDj_AtRCEUwYxhN_TG5u7MAsODjpjxzGRoM8Euv9fEyjDUDhbJFKCv0FhrweHRfCjRVss9SxK6RUCeh3VSzhtFQr5PZj4r7ETVi_-aBU9kdoEeNCzvyVUMg';

afterAll((done) => {
  queryInterface
    .bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe('User Routes Test', () => {
  describe('POST /google-login - login with google account', () => {
    test('200 Success login - should return access_token', (done) => {
      request(app)
        .post('/google-login')
        .set('token', googleToken)
        .then((response) => {
          const { body, status } = response;

          expect(status).toBe(200);
          expect(body).toHaveProperty('access_token', expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe('POST /register - create new user', () => {
    test('201 Success register - should create new User', (done) => {
      request(app)
        .post('/register')
        .send(userData)
        .then((response) => {
          const { body, status } = response;

          expect(status).toBe(201);
          expect(body).toHaveProperty('id', expect.any(Number));
          expect(body).toHaveProperty('email', userData.email);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test('400 Failed register - should return error if email is null', (done) => {
      request(app)
        .post('/register')
        .send({
          password: 'qweqwe',
        })
        .then((response) => {
          const { body, status } = response;

          expect(status).toBe(400);
          expect(body).toHaveProperty('message', 'Email is required');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test('400 Failed register - should return error if email is already exists', (done) => {
      request(app)
        .post('/register')
        .send(userData)
        .then((response) => {
          const { body, status } = response;

          expect(status).toBe(400);
          expect(body).toHaveProperty('message', 'Email must be unique');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test('400 Failed register - should return error if email have invalid format', (done) => {
      request(app)
        .post('/register')
        .send({
          email: 'user.com',
          password: 'qweqwe',
        })
        .then((response) => {
          const { body, status } = response;

          expect(status).toBe(400);
          expect(body).toHaveProperty('message', 'Invalid email format');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe('POST /login - user login', () => {
    test('200 Success login - should return access_token', (done) => {
      request(app)
        .post('/login')
        .send(userData)
        .then((response) => {
          const { body, status } = response;

          expect(status).toBe(200);
          expect(body).toHaveProperty('access_token', expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test('401 Failed login - should return error', (done) => {
      request(app)
        .post('/login')
        .send({
          email: 'hello@mail.com',
          password: 'salahpassword',
        })
        .then((response) => {
          const { body, status } = response;

          expect(status).toBe(401);
          expect(body).toHaveProperty('message', 'Invalid email/password');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
