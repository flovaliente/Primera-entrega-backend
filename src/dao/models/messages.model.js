import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const chatSchema = new mongoose.Schema({
    username: { type: String, required: true },
    message: { type: String, required: true }
}, { timestamps: true });

chatSchema.plugin(mongoosePaginate);

export default mongoose.model('Chat', chatSchema);