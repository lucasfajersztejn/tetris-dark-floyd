import request from 'supertest'
import dotenv from 'dotenv'
import app from '../app.js'
import { connectTestDB, disconnectTestDB, clearTestDB } from '../config/testDatabase.js'

dotenv.config({ path: '.env.test' })

let token

beforeAll(async () => {
  await connectTestDB()
  await clearTestDB()

  // Registrar y loguear usuario de prueba
  await request(app)
    .post('/api/auth/register')
    .send({
      username: 'scoreuser',
      email: 'score@test.com',
      password: '123456'
    })

  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'score@test.com',
      password: '123456'
    })

  token = loginRes.body.token
})

afterAll(async () => {
  await disconnectTestDB()
})

describe('Score Routes', () => {

  describe('POST /api/scores', () => {
    it('should save a score when logged in', async () => {
      const res = await request(app)
        .post('/api/scores')
        .set('Authorization', `Bearer ${token}`)
        .send({
          score: 1500,
          level: 3,
          lines: 12
        })

      expect(res.status).toBe(201)
      expect(res.body.score).toBe(1500)
      expect(res.body.level).toBe(3)
      expect(res.body.lines).toBe(12)
      expect(res.body).toHaveProperty('username')
    })

    it('should fail without token', async () => {
      const res = await request(app)
        .post('/api/scores')
        .send({
          score: 1500,
          level: 3,
          lines: 12
        })

      expect(res.status).toBe(401)
    })

    it('should fail with missing fields', async () => {
      const res = await request(app)
        .post('/api/scores')
        .set('Authorization', `Bearer ${token}`)
        .send({
          score: 1500
        })

      expect(res.status).toBe(500)
    })
  })

  describe('GET /api/scores', () => {
    it('should return top scores without token', async () => {
      const res = await request(app)
        .get('/api/scores')

      expect(res.status).toBe(200)
      expect(Array.isArray(res.body)).toBe(true)
    })

    it('should return scores sorted by score descending', async () => {
      await request(app)
        .post('/api/scores')
        .set('Authorization', `Bearer ${token}`)
        .send({ score: 5000, level: 5, lines: 30 })

      const res = await request(app).get('/api/scores')

      expect(res.status).toBe(200)
      if (res.body.length > 1) {
        expect(res.body[0].score).toBeGreaterThanOrEqual(res.body[1].score)
      }
    })
  })

  describe('GET /api/scores/me', () => {
    it('should return my scores when logged in', async () => {
      const res = await request(app)
        .get('/api/scores/me')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(200)
      expect(Array.isArray(res.body)).toBe(true)
      expect(res.body.length).toBeGreaterThan(0)
    })

    it('should fail without token', async () => {
      const res = await request(app)
        .get('/api/scores/me')

      expect(res.status).toBe(401)
    })
  })

})