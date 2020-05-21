const {ProductCart, Order} = require('../models/order');

exports.getOrderById = (req,res,next,id) => {
    Order.findById(id)
        .populate('product.product', 'name price')
        .exec((err,order) => {
            if(err) {
                return res.status(400).json({
                    error : "No order found"
                });
            }
            req.order = order;
        })
    next();
}