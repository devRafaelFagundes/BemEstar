const request = require('supertest')
const authMiddleware = require('../../src/middlewares/authMiddleware')

test('calling middleware without a token', () => {
    const req = jest.fn()
    const res = jest.fn()
    const next = jest.fn()
    authMiddleware(req, res, next)
    const expectedError = new Error('No token available')
    expectedError.statusCode = 401
    expect(next).toHaveBeenCalledWith(expectedError)
})