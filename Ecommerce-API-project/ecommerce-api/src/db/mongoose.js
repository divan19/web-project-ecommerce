const mongoose = require('mongoose')


mongoose.connect(process.env.DB_URL,{ 
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("ecommerce-api database connected successfully")
}).catch(()=>{
    console.log("ecommerce-api database connection failed")
})



