'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function ManageProductsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteMsg, setDeleteMsg] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Fetch products
  useEffect(() => {
    if (status === 'authenticated') {
      fetchProducts();
    }
  }, [status]);

  async function fetchProducts() {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        // Filter to show only user's products
        const userProducts = data.products.filter(
          (p) => p.createdBy === session?.user?.id
        );
        setProducts(userProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setDeleteMsg('Product deleted successfully!');
        setProducts(products.filter((p) => p._id !== productId));
        setTimeout(() => setDeleteMsg(''), 3000);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete product');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  }

  if (status === 'loading' || loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl">Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Manage Your Products
              </h1>
              <p className="text-gray-600">
                View, edit, and delete your products
              </p>
            </div>
            <Link
              href="/add-product"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              + Add New Product
            </Link>
          </div>

          {/* Delete Success Message */}
          {deleteMsg && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              {deleteMsg}
            </div>
          )}

          {/* Products Grid/Table */}
          {products.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Date Added
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mr-4">
                              {product.imageUrl ? (
                                <img
                                  src={product.imageUrl}
                                  alt={product.title}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              ) : (
                                <span className="text-2xl">📦</span>
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">
                                {product.title}
                              </p>
                              <p className="text-sm text-gray-500 line-clamp-1">
                                {product.shortDescription}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-800 font-semibold">
                          ${product.price}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {new Date(product.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <Link
                              href={`/products/${product._id}`}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                            >
                              View
                            </Link>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4 p-4">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start mb-3">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mr-4">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <span className="text-3xl">📦</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {product.shortDescription}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-blue-600">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/products/${product._id}`}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-center"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No Products Yet
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't added any products yet. Start by adding your first product!
              </p>
              <Link
                href="/add-product"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Add Your First Product
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}