const buildFilter = require('../../helpers/buildFilter')

describe('testing buildFilter function', () => {
    test('should create filter for professional role', () => {
        const userId = 123
        const role = 'professional'
        const query = {}
        expect(buildFilter(query, role, userId)).toEqual({"professional" : 123})
    })

    test('should not add invalid date arguments to the filter object', () => {
        const userId = 123
        const role = "professional"
        const query = {
            made_after : 'abcd'
        }
        expect(buildFilter(query, role, userId)).toEqual({
            professional: 123,
            createdAt: {}
        })
    })
})