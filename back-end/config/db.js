import mongoose from 'mongoose';
import Product from '../models/productModel.js'
import { productsArray } from './dataProducts.js';






const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`mongodb connected: ${conn.connection.host}`);
    

  } catch (err) {
    console.error(`error!!: ${err.message}`);

    process.exit(1);
  }
};

export default connectDB;
