"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const form = new FormData(e.target);
    const data = {
      name: form.get("name"),
      email: form.get("email"),
      password: form.get("password")
    };

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const response = await res.json();

    if (!res.ok) {
      setError(response.error);
      return;
    }

    setSuccess("Registration successful! Redirecting...");
    setTimeout(() => router.push("/login?registered=1"), 2000);
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black px-4">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

          <form onSubmit={handleRegister} className="space-y-4">
            <input 
              name="name" 
              type="text" 
              required 
              placeholder="Full Name" 
              className="input text-black placeholder:text-gray-800" 
            />
            <input 
              name="email" 
              type="email" 
              required 
              placeholder="Email" 
              className="input text-black placeholder:text-gray-800" 
            />
            <input 
              name="password" 
              type="password" 
              required 
              placeholder="Password" 
              className="input text-black placeholder:text-gray-800" 
            />

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
              Register
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}