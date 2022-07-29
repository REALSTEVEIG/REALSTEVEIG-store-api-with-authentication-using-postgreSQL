const Products = require('../model/products')
const {StatusCodes} = require('http-status-codes')
const User = require('../model/user')

exports.createProduct = (req, res) => {
     Products.create({...req.body})
    .then((product) => {
        res.status(StatusCodes.CREATED).json({product})
    })    
    .catch((error) => {
        console.log(error)
        res.status(StatusCodes.UNAUTHORIZED).json({error})
    }) 
}

exports.getAllProducts = async (req, res) => {

}

exports.getSingleProduct = async (req, res) => {

}

exports.updateProduct = async (req, res) => {

}

exports.deleteProduct = async (req, res) => {

}