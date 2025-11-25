'use client';
import Link from 'next/link';

export default function ProductCard({ id, title, description, price }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2">
      <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        <span className="text-6xl">📦</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title || `Product ${id}`}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description || 'Amazing product with excellent features and great quality.'}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">${price || 49.99 * id}</span>
          <Link
            href={`/products/${id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
