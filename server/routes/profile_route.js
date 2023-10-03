const express =require('express') ;
const userController =require('../controllers/user_controller') ;
const router = express.Router();
const auth = require('../controllers/auth_controller');


// router.get('/get_personal_informaion',auth.protect,userController.getPersonalInformations)




module.exports = router;


