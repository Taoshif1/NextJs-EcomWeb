import ProductCard from "@/app/components/ProductCard";

export default function ProductsPage() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4">All Products</h1>
      <p className="text-gray-500 mb-6">
        Browse our latest collection — explore quality at the best prices.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((id) => (
          <ProductCard key={id} id={id} />
        ))}
      </div>
    </div>
  );
}
