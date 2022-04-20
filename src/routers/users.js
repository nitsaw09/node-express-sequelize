const userController = require('../controllers/users.controller')
const express = require('express');

const router = express.Router();

router.get('/', userController.getUsers);

router.get('/:userId', userController.findUser);

router.post('/', userController.createUser);

router.put('/:userId', userController.updateUser);

router.delete('/:userId', userController.deleteUser);

module.exports = router;
