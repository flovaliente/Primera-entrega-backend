import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const Products = new Schema(
    [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
        quantity: { type: Number },
      },
    ],
    { _id: false }
  );

const cartSchema = new mongoose.Schema({
    products: { type: [Products], required: true }
}, { timestamps: true });


cartSchema.plugin(mongoosePaginate);

export default mongoose.model("Carts", cartSchema);