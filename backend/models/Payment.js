const mongoose = require ('mongoose')

const paymentSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required:true
    },
    paymentMethod:{
        type: String,
      enum: ["credit_card", "debit_card", "paypal", "apple_pay", "google_pay"],
      required: true,
    },
  
}, {
    timestamps: true,
  },)


module.exports = mongoose.model("Payment",paymentSchema)  
