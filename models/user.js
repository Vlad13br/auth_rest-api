const mongoose = require('mongoose')
const Joi = require("joi");
const { Schema, model } = mongoose


const userSchema = new Schema(
 {
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: String
})

const joiLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required()
})

const joiRegisterSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required()
})

const User = model('user', userSchema)

module.exports = { User, joiRegisterSchema, joiLoginSchema }