import { Router } from "express";
import ProductModel from "../../dao/models/product.model";

const router = Router();

router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.render("realTimeProducts", { title: 'Real-Time Products', products });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;