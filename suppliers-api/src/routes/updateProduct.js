const express = require("express");
const router = express.Router();

const Product = require("../models/productModel");



router.patch("/",async (req,res)=>{
  try {
    const { sellerID, productID,name,price,quantity,description,category,discount } = req.body;

    const product = await Product.findOne({ sellerID, productID });
    await product.updateProduct(name,price,quantity,description,category,discount);

    res.send(product);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
})

router.patch("/quantity", async (req, res) => {

  try {
    const { sellerID, productID, quantity } = req.body;
    const product = await Product.findOne({ sellerID, productID });
    await product.updateQuantity(parseInt(quantity));
    res.send(product);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});

router.patch("/price", async (req, res) => {

  try {
    const { sellerID, productID, price } = req.body;

    const product = await Product.findOne({ sellerID, productID });
    await product.updatePrice(parseInt(price));
    res.send(product);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});

router.patch("/discount", async (req, res) => {

  try {
    const { sellerID, productID, discount } = req.body;

    const product = await Product.findOne({ sellerID, productID });
    await product.updateDiscount(parseInt(discount));
    res.send(product);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});

module.exports = router;
