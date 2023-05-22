import AsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';



//GET Method
//get all products
//public

export const getAllProducts = AsyncHandler(async (req, res) => {
  const products = await Product.find({});

  if (!products) {
    res.status(404);
    throw new Error('product not found');
  }

  res.status(201).json(products);
});



