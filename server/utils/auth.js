const jwt = require('jsonwebtoken');

const secret = 'ad3plewxd7fh9akh34b0h';
const expiration = '3h';

module.exports = {
    authMiddleware: function ({ req }) {
        let token = req.body.token || req.query.tojken || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration});
            req.user = data
        } catch {
            console.log("Invalid Token")
        }

        return req;
    },
    signToken: function ({ _id, firstname, lastname, username, email }) {
        const payload = { _id, firstname, lastname, username, email };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration});
    }
};