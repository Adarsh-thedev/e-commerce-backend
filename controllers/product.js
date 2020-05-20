const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.getProductById = (req,res,next,id) => {
    Product.findById(id)
      .populate('category')
      .exec((err,product) => {
        if(err) {
            return res.status(400).json({
                error : "No product found"
            });
        }
        req.product = product;
    })
    next();
}

exports.createProduct = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err,fields,file) => {
        if(err) {
            return res.status(400).json({
                error : "An error occured"
            })
        }

        const {name, description, price, category, stock} = fields;

        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ) {
            return res.status(400).json({
                error : "Please include proper details"
            })
        }

        let product = new Product(fields);
        if(file.photo) {
            if(file.photo.size > (3 * 1024 * 1024)) {
                return res.status(400).json({
                    error : "Please try again with a smaller photo size!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        } else {
            return res.json({
                error : "Please include a phot of product"
            })
        }

        //save to DB
        product.save((err,product) => {
            if(err) {
                return res.status(400).json({
                    error : "Failed to save product"
                })
            }
            return res.json(`${product.name} was saved successfully!`);
        });
    })
}

exports.getProduct = (req,res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

//middleware
exports.photo = (req,res,next) => {
    if(req.product.photo.data) {
        res.set('Content-type', req.product.photo.contentType);
        res.send(req.product.photo.data);
    }
    next();
}