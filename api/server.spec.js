const request = require('supertest');
const knex = require('knex');

const server = require('./server.js');
const dbConfig = require('../knexfile.js');

const db = knex(dbConfig.development);

describe('the api layer', () => {
  describe('get /games', () => {
    it('responds with 200', async () => {
      const response = await request(server).get('/games');
      expect(response.status).toBe(200);
    });

    it('responds with json', async () => {
      const response = await request(server).get('/games');
      expect(response.type).toMatch(/json/i);
    });

    it('sends correct response object', async () => {
      const response = await request(server).get('/games');
      expect(response.body).toEqual([]);
    });
  });

  describe('post /games', () => {
    afterEach(async () => {
      await db('games').truncate();
    });

    it('response with 422 if info missing', async () => {
      const body = {
        title: 'Pacman',
        releaseYear: 1980
      };
      const response = await request(server)
        .post('/games')
        .send(body);
      expect(response.status).toBe(422);
      db('games').truncate();
    });

    it('responds with 201', async () => {
      const body = {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980
      };
      const response = await request(server)
        .post('/games')
        .send(body);
      expect(response.status).toBe(201);
    });

    it('responds with array', async () => {
      const body = {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980
      };
      const response = await request(server)
        .post('/games')
        .send(body);
      expect(response.body.length).toBe(1);
    });
  });
});
