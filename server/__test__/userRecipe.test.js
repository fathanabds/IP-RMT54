const app = require('../app.js');
const { User, sequelize } = require('../models');
const request = require('supertest');
const { queryInterface } = sequelize;
const { signToken } = require('../helpers/jwt');

const userData = {
  email: 'afifah@mail.com',
  password: '123456',
};

const userData2 = {
  email: 'rahma@mail.com',
  password: '123456',
};

let userToken1, userToken2, recipeId;

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
      return User.create(userData2);
    })
    .then((data2) => {
      userToken2 = signToken({ id: data2.id, email: data2.email }, 'secret');
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

        recipeId = body.id;
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

describe('PATCH /user-recipes/:id/favorite', () => {
  test('200 success favorite recipe', (done) => {
    request(app)
      .patch(`/user-recipes/${recipeId}/favorite`)
      .set('Authorization', `Bearer ${userToken1}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty('message', 'Recipe has been added to favorite');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('403 favorite recipe unauthorized user', (done) => {
    request(app)
      .patch(`/user-recipes/${recipeId}/favorite`)
      .set('Authorization', `Bearer ${userToken2}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(403);
        expect(body).toHaveProperty('message', 'You are not authorized');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('401 favorite recipe without token', (done) => {
    request(app)
      .patch(`/user-recipes/${recipeId}/favorite`)
      .send(null)
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

  test('401 favorite recipe invalid token', (done) => {
    request(app)
      .patch(`/user-recipes/${recipeId}/favorite`)
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

  test('404 favorite recipe not found', (done) => {
    request(app)
      .patch(`/user-recipes/99/favorite`)
      .set('Authorization', `Bearer ${userToken1}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(404);
        expect(body).toHaveProperty('message', 'Data not found');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe('GET /user-recipes/favorite', () => {
  test('200 success get all user favorite recipes', (done) => {
    request(app)
      .get('/user-recipes/favorite')
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

  test('401 get all user favorite recipes without token', (done) => {
    request(app)
      .get('/user-recipes/favorite')
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

  test('401 get all user favorite recipes invalid token', (done) => {
    request(app)
      .get('/user-recipes/favorite')
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

describe('PATCH /user-recipes/:id/unfavorite', () => {
  test('200 success unfavorite recipe', (done) => {
    request(app)
      .patch(`/user-recipes/${recipeId}/unfavorite`)
      .set('Authorization', `Bearer ${userToken1}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty('message', 'Recipe has been removed from favorite');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('403 unfavorite recipe unauthorized user', (done) => {
    request(app)
      .patch(`/user-recipes/${recipeId}/unfavorite`)
      .set('Authorization', `Bearer ${userToken2}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(403);
        expect(body).toHaveProperty('message', 'You are not authorized');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('401 unfavorite recipe without token', (done) => {
    request(app)
      .patch(`/user-recipes/${recipeId}/unfavorite`)
      .send(null)
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

  test('401 unfavorite recipe invalid token', (done) => {
    request(app)
      .patch(`/user-recipes/${recipeId}/unfavorite`)
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

  test('404 unfavorite recipe not found', (done) => {
    request(app)
      .patch(`/user-recipes/99/favorite`)
      .set('Authorization', `Bearer ${userToken1}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(404);
        expect(body).toHaveProperty('message', 'Data not found');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe('DELETE /user-recipes/:id', () => {
  test('403 delete user recipe unauthorized user', (done) => {
    request(app)
      .delete(`/user-recipes/${recipeId}`)
      .set('Authorization', `Bearer ${userToken2}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(403);
        expect(body).toHaveProperty('message', 'You are not authorized');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('401 delete user recipe without token', (done) => {
    request(app)
      .delete(`/user-recipes/${recipeId}`)
      .send(null)
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

  test('404 delete user recipe failed cause not found', (done) => {
    request(app)
      .delete('/user-recipes/99')
      .send(null)
      .set('Authorization', `Bearer ${userToken2}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(404);
        expect(body).toHaveProperty('message', 'Data not found');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('200 success delete user recipe', (done) => {
    request(app)
      .delete(`/user-recipes/${recipeId}`)
      .send(null)
      .set('Authorization', `Bearer ${userToken1}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty('message', 'Recipe has been deleted');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
