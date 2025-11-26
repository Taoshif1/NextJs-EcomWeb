"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function ProductDetails({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productId, setProductId] = useState(null);

  // Unwrap params Promise first
  useEffect(() => {
    async function unwrapParams() {
      const unwrappedParams = await params;
      setProductId(unwrappedParams.id);
    }
    unwrapParams();
  }, [params]);

  // Fetch product after getting the ID
  useEffect(() => {
    async function fetchProduct() {
      if (!productId) return;

      try {
        console.log("Fetching product with ID:", productId);
        
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        
        console.log("API Response:", data);
        
        if (res.ok && data.product) {
          setProduct(data.product);
        } else {
          setError(data.error || "Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading product...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {error || "Product Not Found"}
            </h2>
            <p className="text-gray-600 mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => router.push("/products")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              ← Back to Products
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.push("/products")}
            className="mb-6 flex items-center text-gray-600 hover:text-blue-600 transition font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="h-96 lg:h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden">
                {product.imageUrl && product.imageUrl !== "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg" ? (
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-9xl">📦</span>
                )}
              </div>

              {/* Product Details */}
              <div className="p-8 lg:p-12">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold">
                    {product.category || "General"}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  {product.title}
                </h1>

                {/* Short Description */}
                <p className="text-lg text-gray-600 mb-6 italic">
                  {product.shortDescription}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-5xl font-bold text-blue-600">
                    ${product.price}
                  </span>
                </div>

                {/* Divider */}
                <hr className="my-6 border-gray-200" />

                {/* Full Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Product Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {product.fullDescription}
                  </p>
                </div>

                {/* Meta Information */}
                {product.createdAt && (
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Product Information</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span className="font-medium text-gray-800">{product.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Added on:</span>
                        <span className="font-medium text-gray-800">
                          {new Date(product.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => router.push("/products")}
                    className="flex-1 bg-gray-600 text-white px-6 py-4 rounded-lg hover:bg-gray-700 transition font-semibold"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}