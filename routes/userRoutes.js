const userController = require('../controllers/userController');
const router = require('express').Router();
router.post("/",userController.register)
router.post("/login",userController.login)

module.exports = router;