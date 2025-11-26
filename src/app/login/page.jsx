"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res.ok) {
      setError("Invalid email or password");
      return;
    }

    const callbackUrl =
      new URLSearchParams(window.location.search).get("callbackUrl") || "/";
    router.push(callbackUrl);
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center text-black bg-gray-100 px-4">
        <div className="bg-gray-200 p-8 rounded-xl shadow-xl max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="font-black space-y-4">
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="input"
            />
            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              className="input"
            />

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
              Login
            </button>
          </form>

          <button
            onClick={() => signIn("google")}
            className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg"
          >
            Continue with Google
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
