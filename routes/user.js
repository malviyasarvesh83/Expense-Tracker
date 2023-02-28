const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

router.get('/adduser',userController.getUser);
router.post('/adduser', userController.postUser);
router.delete('/adduser/:id', userController.deleteUser);
router.get('/adduser/:id', userController.getEditUser);
router.put('/adduser/:id', userController.postEditUser);

module.exports = router;