const request = require('supertest');
const app = require('./server');

describe('Test GET user:id', () => {
  it('should respond with 200 success', async () => {
    const response = await request(app).get('/user/123').expect(200);
    expect(response.text).toBe('User info');
  });
});

describe('Test POST Signup', () => {
  it('should respond with 200 with an id in the response', async () => {
    await request(app)
      .post('/signup')
      .send({
        name: 'devyn',
        password: 'helloworld',
        email: 'd@p.com',
      })
      .expect(200)
      .expect((res) => {
        res.body.id = 678;
      });
  });
  it('should respond with 200 - Name - all caps', async () => {
    await request(app)
      .post('/signup')
      .send({
        name: 'DEVYN',
        password: 'helloworld',
        email: 'd@p.com',
      })
      .expect(200)
      .expect((res) => {
        res.body.id = 678;
      });
  });
  it('should respond with 200 - Name - mix of lower and uppercase letters', async () => {
    await request(app)
      .post('/signup')
      .send({
        name: 'Devyn',
        password: 'helloworld',
        email: 'd@p.com',
      })
      .expect(200)
      .expect((res) => {
        res.body.id = 678;
      });
  });
  it('should respond with 200 - Password - with special characters', async () => {
    await request(app)
      .post('/signup')
      .send({
        name: 'devyn',
        password: '##hello!',
        email: 'd@p.com',
      })
      .expect(200)
      .expect((res) => {
        res.body.id = 678;
      });
  });
  describe('Missing payload data', () => {
    it('should respond with 400 - missing payload', async () => {
      await request(app)
        .post('/signup')
        .expect(400)
        .expect((res) => {
          res.body.err.reason = 'Missing required data';
        });
    });
    it('should respond with 400 - missing name', async () => {
      await request(app)
        .post('/signup')
        .send({
          password: '##helloworld!',
          email: 'd@p.com',
        })
        .expect(400)
        .expect((res) => {
          res.body.err.reason = 'Missing required data';
        });
    });
    it('should respond with 400 - missing email', async () => {
      await request(app)
        .post('/signup')
        .send({
          name: 'devyn',
          password: '##hello!',
        })
        .expect(400)
        .expect((res) => {
          res.body.err.reason = 'Missing required data';
        });
    });
    it('should respond with 400 - missing password', async () => {
      await request(app)
        .post('/signup')
        .send({
          name: 'devyn',
          email: 'd@p.com',
        })
        .expect(400)
        .expect((res) => {
          res.body.err.reason = 'Missing required data';
        });
    });
  });
  describe('Invalid email payload data', () => {
    it('should respond with 400 - Email - no "@" symbol', async () => {
      await request(app)
        .post('/signup')
        .send({
          name: 'devyn',
          password: 'helloworld',
          email: 'dp.com',
        })
        .expect(400)
        .expect((res) => {
          res.body.error.reason = 'invalid request payload';
        });
    });
    it('should respond with 400 - Email - no "." symbol', async () => {
      await request(app)
        .post('/signup')
        .send({
          name: 'devyn',
          password: 'helloworld',
          email: 'd@pcom',
        })
        .expect(400)
        .expect((res) => {
          res.body.error.reason = 'invalid request payload';
        });
    });
    it('should respond with 400 - Email - too short', async () => {
      await request(app)
        .post('/signup')
        .send({
          name: 'devyn',
          password: 'helloworld',
          email: 'd',
        })
        .expect(400)
        .expect((res) => {
          res.body.error.reason = 'invalid request payload';
        });
    });
  });
  describe('Invalid name payload data', () => {
    it('should respond with 400 - Name - with numbers', () => {
      request(app)
        .post('/signup')
        .send({
          name: 'dev8yn',
          password: 'helloworld',
          email: 'dpcom',
        })
        .expect(400)
        .expect((res) => {
          res.body.err.reason = 'invalid request payload';
        });
    });
    it('should respond with 400 - Name - with special characters', () => {
      request(app)
        .post('/signup')
        .send({
          name: 'devyn!',
          password: 'helloworld',
          email: 'dpcom',
        })
        .expect(400)
        .expect((res) => {
          res.body.err.reason = 'invalid request payload';
        });
    });
  });
  describe('Invalid password payload data', () => {
    it('should respond with 400 - Password - too short', async () => {
      await request(app)
        .post('/signup')
        .send({
          name: 'devyn',
          password: 'he',
          email: 'dpcom',
        })
        .expect(400)
        .expect((res) => {
          res.body.error.reason = 'invalid request payload';
        });
    });
    it('should respond with 400 - Password - too long', async () => {
      await request(app)
        .post('/signup')
        .send({
          name: 'devyn',
          password: 'hellohellohellohellohellog', //21 characters long
          email: 'dpcom',
        })
        .expect(400)
        .expect((res) => {
          res.body.error.reason = 'invalid request payload';
        });
    });
    it('should respond with 400 - Password - with spaces', async () => {
      await request(app)
        .post('/signup')
        .send({
          name: 'devyn',
          password: 'hello world',
          email: 'dpcom',
        })
        .expect(400)
        .expect((res) => {
          res.body.error.reason = 'invalid request payload';
        });
    });
    it('should respond with 400 - Password - with "password" substring', async () => {
      await request(app)
        .post('/signup')
        .send({
          name: 'devyn',
          password: 'hellopasswordworld',
          email: 'dpcom',
        })
        .expect(400)
        .expect((res) => {
          res.body.error.reason = 'invalid request payload';
        });
    });
  });
});
