const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL,{ 
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("supplies-api database connected successfully")
}).catch(()=>{
    console.log("supplies-api database connection failed")
})



