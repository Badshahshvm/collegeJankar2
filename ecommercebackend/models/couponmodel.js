// const mongoose = require('mongoose');


// const couponSchema = new mongoose.Schema({
//   code: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   discountPercentage: {
//     type: Number,
//     required: true
//   }
// });

// const Coupon = mongoose.model('Coupon', couponSchema);

// module.exports = Coupon;
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true } // Optional expiration date
});

module.exports = mongoose.model('Coupon', couponSchema);
