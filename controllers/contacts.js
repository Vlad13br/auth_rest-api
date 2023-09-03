const Contact = require('../models/contacts')
const { NotFound } = require("http-errors");

const createContact = async (req, res) => {
  const { _id } = req.user;
   const result = await Contact.create({...req.body, owner: _id});
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result
    }
  })
}

const getContactById = async (req, res) => {
  const { id } = req.params;
    const result = await Contact.findById(id); 
    if (!result) {
        throw new NotFound(`Product with id=${id} not found`);
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
}

const getAllContacts = async (req, res) => {
   const {_id} = req.user;
    const {page = 1, limit = 10} = req.query;
    const skip = (page - 1) * limit;
    const products = await Contact.find({owner: _id}, "", {skip, limit: Number(limit)}).populate("owner", "_id name email");

    res.json({
        status: "success",
        code: 200,
        data: {
            result: products
        }
    });
}

const updateContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw new NotFound(`Product with id=${id} not found`);
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
}

const deleteContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
        throw new NotFound(`Product with id=${id} not found`);
    }
    res.json({
        status: "success",
        code: 200,
        message: "product deleted",
        data: {
            result
        }
    })
}

module.exports = {createContact,deleteContact,updateContact,getAllContacts,getContactById}