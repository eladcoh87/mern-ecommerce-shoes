import mongoose from 'mongoose';

const sizeInStockSchema = mongoose.Schema({
  size: { type: Number, required: true },
  stockCount: { type: Number, required: true },
});

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    secImage: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    sizeInStock: [sizeInStockSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
