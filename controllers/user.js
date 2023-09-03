const { Conflict,Unauthorized } = require("http-errors");
const { User } = require('../models/user')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

const {SECRET_KEY} = process.env

const register = async (req, res) => {
  const { email, password } = req.body;
  const candidate = await User.findOne({ email });
    if(candidate){
        throw new Conflict(`User with ${email} already exist`)
  }
  const hashedPassword = bcrypt.hashSync(password, 10)
  
  const userData = { email, password: hashedPassword }
  const user = await User.create(userData)

   res.status(201).json({
        status: "success",
        code: 201,
        data: {
           userData
        }
    });
}

const login = async (req, res) => {
  const { email, password } = req.body;
   const user = await User.findOne({email});
const iSPasswordCorrect = bcrypt.compareSync(password, user.password)

    if (!user || !iSPasswordCorrect) {
        throw new Unauthorized("Email or password is wrong");
    }


   const payload = {
        id: user._id
    };
  
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
  
   await User.findByIdAndUpdate(user._id, {token});
    res.json({
        status: "success",
        code: 200,
        data: {
            token
        }
    })
}

const logout = async(req, res)=> {
    const { email } = req.body;
    await User.findOneAndUpdate({email}, {token: null});
    res.status(204).json();
}

const getCurrent = async (req, res) => {
   const { email} = req.user;
    res.json({
        status: "success",
        code: 200,
        data: {
                email

        }
    })
}

module.exports ={register,login,logout,getCurrent}