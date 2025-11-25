"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData(e.target);

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: { "Content-Type": "application/json" },
    });

    let data = {};
    try {
      data = await res.json();
    } catch (err) {
      setErrorMsg("Server returned empty response");
      setLoading(false);
      return;
    }

    if (!res.ok) {
      setErrorMsg(data.error || "Registration failed");
      setLoading(false);
      return;
    }

    setSuccessMsg("Account created successfully! Redirecting...");
    setLoading(false);

    setTimeout(() => router.push("/login"), 1500);
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-cyan-500 shadow-md rounded-lg p-8">

        <h1 className="text-3xl font-bold mb-2 text-center">Create Account</h1>
        <p className="text-gray-600 mb-6 text-center font-bold">
          Join our platform today 🚀
        </p>

        {successMsg && (
          <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div className="bg-red-100 text-red-800 p-2 mb-4 rounded">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 ">
          <input name="name" placeholder="Full Name" className="border p-3 w-full rounded" />
          <input name="email" type="email" placeholder="Email Address" className="border p-3 w-full rounded" />
          <input name="password" type="password" placeholder="Password" className="border p-3 w-full rounded" />

          <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded">
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-black font-semibold cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
