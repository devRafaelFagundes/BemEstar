"use strict";
const professionalMiddleware = async (req, res, next) => {
    if (req.userInfo.role === 'professional') {
        next();
    }
    else {
        const error = new Error('Access denied, invalid role');
        error.statusCode = 403;
        next(error);
    }
};
module.exports = professionalMiddleware;
//# sourceMappingURL=professionalMiddleware.js.map