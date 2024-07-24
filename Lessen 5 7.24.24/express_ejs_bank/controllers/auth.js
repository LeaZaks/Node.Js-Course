const router = require('express').Router();

// Register
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {

});

// Login
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {

});

module.exports = router;