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
     try {
        const products = await Products.findAll()
        res.status(StatusCodes.OK).json({products, count : products.length})
     }
     catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
     }
}

exports.getSingleProduct = async (req, res) => {

    try {
        const product = await Products.findOne({where : {id : req.params.id}})
        res.status(StatusCodes.OK).json({product})
        console.log(product)
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }

}

exports.updateProduct = async (req, res) => {
    try {
        const product = await Products.update({name : req.body.name, price : req.body.price, image : req.body.image}, {where : {id : req.params.id}})
        res.status(StatusCodes.OK).json({product})
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Products.destroy({where : {id : req.params.id}})
        res.status(StatusCodes.OK).json({msg : `Deleted successfully!`})
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg : `Problem deleting specified product!`})
    }

}