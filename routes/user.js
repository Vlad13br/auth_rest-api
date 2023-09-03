const express = require("express");

const auth = require("../middlewares/auth");
const ctrlWrapper = require('../middlewares/ctrlWrapper')
const validation = require('../middlewares/validation')
const {joiRegisterSchema, joiLoginSchema} = require("../models/user");
const { register,login,logout,getCurrent} = require('../controllers/user')

const router = express.Router();

router.post("/register", validation(joiRegisterSchema), ctrlWrapper(register));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(login));

router.put("/logout", auth, ctrlWrapper(logout));

router.get("/current", auth, ctrlWrapper(getCurrent));

module.exports = router;