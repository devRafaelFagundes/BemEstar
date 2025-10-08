const request = require('supertest')
const authMiddleware = require('../../src/middlewares/authMiddleware')
const jwt = require('jsonwebtoken')


test('calling middleware without a token', () => {
    const req = jest.fn()
    const res = jest.fn()
    const next = jest.fn()
    authMiddleware(req, res, next)
    const expectedError = new Error('No token (or refresh token) available')
    expectedError.statusCode = 401
    expect(next).toHaveBeenCalledWith(expectedError)
})

test('calling middlware with invalid token (not valid or expired)', () => {
    jest.spyOn(jwt, 'verify').mockReturnValue(new Error('invalidTokenNotExpired'))
    const req = jest.fn(() => {
        cookies : {
            token: true
        }
    })
    const res = jest.fn()
    const next = jest.fn()
    authMiddleware(req, res, next)
    const expectedError = new Error('No token (or refresh token) available')
    expectedError.statusCode = 401
    expect(next).toHaveBeenCalledWith(expectedError)
})