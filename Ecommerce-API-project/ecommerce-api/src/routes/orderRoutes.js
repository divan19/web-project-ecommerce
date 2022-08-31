const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const auth = require("../middlewares/auth");


router.post("/place", auth, async (req, res) => {

  try {
    const { trxID, orders } = req.body;
    const order = new Order({
      customerID: req.user.customerID,
      trxID,
      orders,
    });

    await order.generateOrderID();

    res.send(order);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});

router.get("/information", auth, async (req, res) => {
  try {
    const orderID = req.query.orderID;
    const order = await Order.orderInformation(orderID);
    res.send(order);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});

router.get("/view", auth, async (req, res) => {
  try {
    const orders = await Order.find({ customerID: req.user.customerID });
    res.send(orders);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }

});


router.post('/changestatus',async(req,res)=>{
    try{

        const {orderID} = req.query.orderID;
        await Order.changeStatus(orderID)
        res.status(200).send({
            status:true
        });

    }catch(e){
        res.send({e});
    }
})



module.exports = router;
