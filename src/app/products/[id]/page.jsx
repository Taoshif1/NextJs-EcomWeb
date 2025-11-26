"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function ProductDetails({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        
        if (res.ok) {
          const data = await res.json();
          setProduct(data.product);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl text-gray-600">Loading product...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-center flex-col gap-4">
          <h2 className="text-2xl font-bold mx-10">Product Not Found</h2>
          <button
            onClick={() => router.push("/products")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Back to Products
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-8xl">📦</span>
            )}
          </div>

          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            {product.title}
          </h1>

          <p className="text-lg text-gray-700 mb-6">
            {product.fullDescription}
          </p>

          <p className="text-3xl font-semibold text-blue-600 mb-6">
            ${product.price}
          </p>

          <p className="text-sm text-gray-500 mb-8">
            Category: <span className="font-medium">{product.category}</span>
          </p>

          <button
            onClick={() => router.push("/products")}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            ← Back to Products
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}