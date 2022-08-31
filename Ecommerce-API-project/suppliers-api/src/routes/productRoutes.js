const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require("../models/productModel");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });


router.post("/add", async (req, res) => {

  try {
    const {
      name,
      price,
      quantity,
      description,
      category,
      rating,
      sellerID,
      discount,
    } = req.body;
    const product = new Product({
      name,
      price,
      quantity,
      description,
      category,
      rating,
      sellerID,
      discount,
 
    });
    await product.generateID();
    res.send(product);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});



router.get("/view", async (req, res) => {
  try {
    const ID = req.query.ID;
    console.log(req.query);
    const sellerID = req.query.sellerID;
    if (ID) {
      const product = await Product.viewOne(ID);
      console.log(product);
      res.send(product);
    } else if (sellerID) {
      const products = await Product.viewSpecificSellerID(sellerID);
      res.send(products);
    } else {
      const products = await Product.viewAll();
      res.send(products);
    }
  } catch (e) {
    const error = e.message;
    console.log(error);
    res.send({ error });
  }
});



module.exports = router;
