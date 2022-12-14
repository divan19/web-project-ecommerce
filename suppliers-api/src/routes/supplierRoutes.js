const express = require("express");
const router = express.Router();

const SupplierTransaction = require("../models/supplierTransactionModel");
const Product = require('../models/productModel')

router.post("/add", async (req, res) => {
  try {
    const { orderID, customerID, sellerID, trxID, amount, quantity,productID } = req.body;
    const supplierTransaction = new SupplierTransaction({
      orderID,
      customerID,
      sellerID,
      trxID,
      amount,
      quantity,
      productID
    });
    await supplierTransaction.save();
    res.send(supplierTransaction);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});

router.post("/validateOrder", async (req, res) => {
  try {

    const {trxID,quantity,productID,orderID}=req.body;
    const product =await Product.find({productID})
    const upQuantity= product.updateQuantity(quantity)
    const supplierValidate =SupplierTransaction.validate(trxID);
    await Promise.all([upQuantity,supplierValidate]);

    const result = await SupplierTransaction.find({orderID,validateOrder:false})
    
    res.send({ message: "success" ,
      changeStatus: result.length ? false: true
  });
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});



router.post("/view", async (req, res) => {
  try {
    const {sellerID} = req.body
    const orders=await SupplierTransaction.find({sellerID});
    res.send(orders);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});



module.exports = router;
