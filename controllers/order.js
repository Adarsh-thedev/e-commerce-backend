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

exports.createOrder = (req,res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err,order) => {
        if(err) {
            return res.status(400).json({
                error : "Failed to save this order"
            })
        }
        return res.json(order);
    })
}

exports.getAllOrders = (req,res) => {
    Order.find()
      .populate('user', '_id name')
      .exec((err,order) => {
          if(err) {
              return res.status(400).json({
                  error : "No order found"
              });
          }
          return res.json(order);
      })
}

exports.getOrderStatus = (req,res) => {
    return res.json(Order.schema.path('status').enumValues);
}

exports.updateStatus = (req,res) => {
    Order.update(
        {_id : req.order.orderId},
        {$set : {status : req.body.status}},
        (err,order) => {
            if(err) {
                return res.status(400).json({
                    error : "Can not update order status"
                })
            }
            return res.json(order);
        }
    );
}