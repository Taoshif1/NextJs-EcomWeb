import ProductCard from "@/app/components/ProductCard";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
      cache: 'no-store'
    });
    
    if (!res.ok) return { products: [] };
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error fetching products:', error);
    return { products: [] };
  }
}

export default async function ProductsPage() {
  const { products } = await getProducts();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              All Products
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our latest collection — explore quality at the best prices.
            </p>
          </div>

          {/* Search Bar (UI Only) */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                Search
              </button>
            </div>
          </div>

          {/* Category Filter (UI Only) */}
          <div className="flex justify-center mb-8 gap-3 flex-wrap">
            {['All', 'Electronics', 'Fashion', 'Home', 'Sports'].map((category) => (
              <button
                key={category}
                className="px-6 py-2 bg-white border border-gray-300 rounded-full text-black hover:bg-blue-50 hover:border-blue-500 transition"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 font-black">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No Products Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Be the first to add a product to our store!
              </p>
              <a
                href="/add-product"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Add Product
              </a>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}