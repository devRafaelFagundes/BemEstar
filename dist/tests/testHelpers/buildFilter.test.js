"use strict";
const buildFilter = require('../../helpers/buildFilter');
describe('testing buildFilter function', () => {
    test('should create filter for professional role', () => {
        let spy;
        const spyCam = {
            buildFilter
        };
        spy = jest.spyOn(spyCam, 'buildFilter');
        const userId = 123;
        const role = 'professional';
        const query = {};
        expect(spyCam.buildFilter(query, role, userId)).toEqual({ "professional": 123 });
        //testing mock functions and spy
        expect(spy).toHaveBeenCalledTimes(1);
        jest.restoreAllMocks();
    });
    test('should not add invalid date arguments to the filter object', () => {
        const userId = 123;
        const role = "professional";
        const query = {
            made_after: 'abcd'
        };
        expect(buildFilter(query, role, userId)).toEqual({
            professional: 123,
            createdAt: {}
        });
    });
});
//# sourceMappingURL=buildFilter.test.js.map