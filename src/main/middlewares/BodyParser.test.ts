import request from 'supertest';
import app from '@/main/config/app';

describe('BodyParserMiddleware', () => {
  test('Should parser body as json', async () => {
    app.post('/test-body-parser', (req, res) => {
      res.send(req.body);
    });

    await request(app)
      .post('/test-body-parser')
      .send({ name: 'Fernando' })
      .expect({ name: 'Fernando' });
  });
});
