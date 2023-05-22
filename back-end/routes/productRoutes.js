import express from 'express';
import { getAllProducts } from '../controllers/productControlles.js'

const router = express.Router();



//get all products :

router.get('/allproducts', getAllProducts);








export default router;