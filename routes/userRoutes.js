const express = require("express");
const router = express.Router();
const {registerUser, loginUser, currentUser, deleteUser} = require("../controller/userController");
const validateToken = require("../middleware/validateToken");


router.route('/register').post(registerUser);
router.post('/login', loginUser);
router.get('/current',validateToken,currentUser);
router.delete('/',validateToken,deleteUser);


module.exports = router;