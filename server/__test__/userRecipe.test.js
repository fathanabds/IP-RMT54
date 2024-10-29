const app = require('../app.js');
const { User, sequelize } = require('../models');
const request = require('supertest');
const { queryInterface } = sequelize;
const { signToken } = require('../helpers/jwt');

const userData = {
  email: 'afifah@mail.com',
  password: '123456',
};

let userToken1;

const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJvbm9AbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNjIxMTYzNDYyfQ.WhdvxtOveekRlXU0';

const dataRecipe = {
  title: 'Best Potato Cheese Soup in a bread bowl',
  image: 'https://img.spoonacular.com/recipes/634927-312x231.jpg',
  calories: 750,
  protein: '26g',
  fat: '45g',
  carbs: '58g',
};

beforeAll((done) => {
  User.create(userData)
    .then((data) => {
      userToken1 = signToken({ id: data.id, email: data.email }, 'secret');
      return;
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  queryInterface
    .bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true })
    .then(() => {
      return queryInterface.bulkDelete('UserRecipes', null, { truncate: true, cascade: true, restartIdentity: true });
    })
    .then(() => {
      return queryInterface.bulkDelete('Recipes', null, { truncate: true, cascade: true, restartIdentity: true });
    })
    .then(() => {
      done();
    })
    .catch((err) => done(err));
});

describe('POST /user-recipes', () => {
  test('201 success add recipe', (done) => {
    request(app)
      .post('/user-recipes')
      .send(dataRecipe)
      .set('Authorization', `Bearer ${userToken1}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(201);
        expect(body).toHaveProperty('id', expect.any(Number));
        expect(body).toHaveProperty('UserId', expect.any(Number));
        expect(body).toHaveProperty('RecipeId', expect.any(Number));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('401 add recipe without token', (done) => {
    request(app)
      .post('/user-recipes')
      .send(dataRecipe)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);

        expect(body).toHaveProperty('message', 'Invalid token');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('401 add recipe invalid token', (done) => {
    request(app)
      .post('/user-recipes')
      .set('Authorization', `Bearer ${invalidToken}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty('message', 'Invalid token');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe('GET /user-recipes', () => {
  test('200 success get all user recipes', (done) => {
    request(app)
      .get('/user-recipes')
      .set('Authorization', `Bearer ${userToken1}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBeGreaterThan(0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('401 get all user recipes without token', (done) => {
    request(app)
      .get('/user-recipes')
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);

        expect(body).toHaveProperty('message', 'Invalid token');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('401 get all user recipes invalid token', (done) => {
    request(app)
      .get('/user-recipes')
      .set('Authorization', `Bearer ${invalidToken}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);

        expect(body).toHaveProperty('message', 'Invalid token');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});