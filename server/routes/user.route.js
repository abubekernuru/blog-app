const express = require('express');
const router = express.Router();
const { test, generateSignature, updateUser, deleteUser, signoutUser, getUsers, deleteUsers } = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/verifyToken.js');

// test api route
router.get('/test', test)
router.get('/sign-image', generateSignature)
router.put('/update/:userId', verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)
router.post('/signout', signoutUser)
router.get('/getusers', verifyToken, getUsers)
router.delete('/deleteuser/:userId', verifyToken, deleteUsers)

module.exports = router;


