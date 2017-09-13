const router = require('express').Router()
const jwt = require('jsonwebtoken')

const config = require('./config')
const User = require('./models/user')

// get jwt token
router.post('/authenticate', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
          res.status(500).json({
              success: false,
              message: 'Server error. Please try again later.'
          })
        }

        if (!user) {
            res.status(403).json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else {
            if (user.password !== req.body.password) {
                res.status(403).json({
                    succes: false,
                    message: 'Authentication failed. Wrong password.'
                });
            } else {
                let token = jwt.sign(user.toObject(), config.secret, {
                    expiresIn: 1440 * 60
                });

                res.json({
                    success: true,
                    message: 'Authentication successful.',
                    token: token
                });
            }
        }
    });
});

// verify jwt token
router.use((req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                  success: false,
                  message: 'Failed to authenticate token.'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).json({
            success: false,
            message: 'No token provided.'
        });
    }
});

router.use('/books', require('./routes/books'))
router.use('/users', require('./routes/users'))

module.exports = router
