import { connectDB } from "../../../../lib/mongodb";
import Product from "@/models/Product";

export async function DELETE(req, { params }) {
  await connectDB();
  await Product.findByIdAndDelete(params.id);
  return Response.json({ message: "Deleted" });
}
