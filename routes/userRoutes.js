const express = require('express');
const { registerUser, loginUser, updateUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update/:id', updateUser);

module.exports = router;
