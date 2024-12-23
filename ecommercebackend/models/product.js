const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  // img: String, // You can remove this if you are replacing it with the image array
  category: String,
  rating: Number,
  productId: { type: String, unique: true }, // Added productId field
  inStockValue: Number, // Available stock value
  soldStockValue: Number, // Number of items sold
  visibility: { type: String, default: 'on' }, // Visibility field with default 'on'
  images: [
    {
      imageUrl: { type: String, required: true }, // URL of the image
      imageId: { type: String, required: true },  // Unique ID for the image (e.g., from a cloud storage provider)
    }
  ],
  description: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
