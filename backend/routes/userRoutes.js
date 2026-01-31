const express = require('express');
const router = express.Router();
const { authUser, registerUser } = require('../controllers/UserController');

// Login Route
router.post('/login', authUser);

// Register Route (This is the one you were missing!)
router.post('/', registerUser);

module.exports = router;