const Category = require('../models/category');

exports.getCategoryById = (req,res,next,id) => {
    Category.findById(id).exec((err,cate)=> {
        if(err) {
            return res.status(400).json({
                error : "Category not found in DB"
            });
        }
        req.category = cate;
        next();
    })
}

exports.createCatagory = (req,res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if(err || !category) {
            return res.status(400).json({
                error : "Unable to save category"
            });
        }
        return res.json({category});
    })
}