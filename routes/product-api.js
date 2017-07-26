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

// ROUTE TO POST THE NEW GIFT INTO MONGO DB

router.post('/products', (req, res, next)=>{
  const theProduct = new ProductModel({
    name: req.body.giftName,
    sku: req.body.giftSku,
    type: req.body.giftType,
    price: req.body.giftPrice,
    description: req.body.giftDescription,
    image: req.body.giftImage,
    ownerId: req.user._id,
  });
  theProduct.save((err)=>{
    if(err){
      res.json(err);
      return;
    }
    theProduct.ownerId= req.user;

    res.json({
      message: "New Product created",
      id: theProduct._id
    });
  });
});

//ROUTE TO POPULATE CURRENT USER GIFTS

router.get('/products/user', (req, res, next)=>{
  if(!req.user){
    res.status(401).json({message: 'Not the user 👎'});
  }
  ProductModel
      .find({ownerId: req.user._id})
      .populate('ownerId', {encryptedPassword: 0})
      .exec((err, usersProducts)=>{
        if(err){
          res.status(500).json({message: 'Gifts find went 👎'});
          return;
        }
        res.status(200).json(usersProducts);
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
