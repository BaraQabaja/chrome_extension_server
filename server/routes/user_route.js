const express =require('express') ;
const userController =require('../controllers/user_controller.js') ;
const auth = require('../controllers/auth_controller');

const router = express.Router();

router.post('/create_user',userController.createUser)
router.get('/get_personal_informaion',auth.protect,userController.getPersonalInformations)
router.put('/updateUsername',auth.protect,userController.updateUsername)
module.exports = router;
