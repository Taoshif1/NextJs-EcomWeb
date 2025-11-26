import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
    },
    category: { type: String, default: "General" },
     createdBy: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
