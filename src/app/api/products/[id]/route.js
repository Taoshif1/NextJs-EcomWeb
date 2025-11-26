import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req, { params }) {
  try {
    await connectDB();
    
    // Await params in Next.js 15+
    const { id } = await params;
    
    console.log("Fetching product with ID:", id);
    
    const product = await Product.findById(id);
    
    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }
    
    console.log("Product found:", product.title);
    
    return Response.json({ product }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return Response.json({ 
      error: "Failed to fetch product",
      details: error.message 
    }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    
    // Await params in Next.js 15+
    const { id } = await params;
    
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }
    
    return Response.json({ 
      message: "Product deleted successfully",
      deleted: true 
    }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return Response.json({ 
      error: "Failed to delete product",
      details: error.message 
    }, { status: 500 });
  }
}