import request from 'supertest'
import dotenv from 'dotenv'
import app from '../app.js'
import { connectTestDB, disconnectTestDB, clearTestDB } from '../config/testDatabase.js'

dotenv.config({ path: '.env.test' })

beforeAll(async () => {
  await connectTestDB()
  await clearTestDB()
})

afterAll(async () => {
  await disconnectTestDB()
})

describe('Auth Routes', () => {

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@test.com',
          password: '123456'
        })

      expect(res.status).toBe(201)
      expect(res.body).toHaveProperty('token')
      expect(res.body.user.username).toBe('testuser')
      expect(res.body.user).not.toHaveProperty('password')
    })

    it('should fail if email already exists', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser2',
          email: 'test@test.com',
          password: '123456'
        })

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('message')
    })

    it('should fail if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'incomplete@test.com'
        })

      expect(res.status).toBe(500)
    })
  })

  describe('POST /api/auth/login', () => {
    it('should login successfully with correct credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@test.com',
          password: '123456'
        })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('token')
      expect(res.body.user.email).toBe('test@test.com')
    })

    it('should fail with wrong password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@test.com',
          password: 'wrongpassword'
        })

      expect(res.status).toBe(401)
    })

    it('should fail with non-existent email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'noexiste@test.com',
          password: '123456'
        })

      expect(res.status).toBe(401)
    })
  })

  describe('GET /api/auth/me', () => {
    it('should return current user with valid token', async () => {
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@test.com',
          password: '123456'
        })

      const token = loginRes.body.token

      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(200)
      expect(res.body.email).toBe('test@test.com')
    })

    it('should fail without token', async () => {
      const res = await request(app)
        .get('/api/auth/me')

      expect(res.status).toBe(401)
    })

    it('should fail with invalid token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer tokeninvalido')

      expect(res.status).toBe(401)
    })
  })

})