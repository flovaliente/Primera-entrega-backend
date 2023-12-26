import { Router } from "express";
//import { __dirname } from "../utils.js";
import productModel from "../../dao/models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    let products = await productModel.find();
    products = products.map((p) => p.toJSON());
    res.render("home", { title: "MongoDB Deploy ", products });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;