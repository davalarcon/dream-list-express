var express = require ('express');
var router = express.Router();

const ProductModel = require('../models/productModel');


router.get('/products', (req, res, next)=>{
  ProductModel.find((err, productList)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json(productList);
  });
});


router.post('/products', (req, res, next)=>{
  const theProduct = new ProductModel({
    name: req.body.name,
    brand: req.body.brand,
    model: req.body.model,
    description: req.body.description,
    price: req.body.price,
  });
  theProduct.save((err)=>{
    if(err){
      res.json(err);
      return;
    }

    res.json({
      message: "New Product created",
      id: theProduct._id
    });
  });
});



router.get('/products/:myId/delete', (req, res, next)=>{
  ProductModel.findByIdAndRemove(
    req.params.myId,
    (err, theProductFromDb)=>{
      if(err){
        res.json(err);
        return;
      }
      res.json({
        message: "Product Deleted",
        id: theProduct._id
      });
    }
  );
});

router.get('/products/:myId/edit', (req, res, next)=>{
  ProductModel.findById(
    req.params.myId,
    (err, productFromDb)=>{
      if(err){
        res.json(err);
        return;
      }
      res.json({
        message: "Product edited",
        id: theProduct._id
      });
    }
  );
});

router.post('/products/:myId/update', (req, res, next)=>{
  ProductModel.findByIdAndUpdate(
    req.params.myId,
    {
      name: req.body.name,
      brand: req.body.brand,
      model: req.body.model,
      description: req.body.description,
      price: req.body.price,
    },
    (err, productFromDb)=>{
        if(err){
          res.json(err);
          return;
        }
    }
  );
});






module.exports = router;
