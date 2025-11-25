"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-700 p-6 shadow-md rounded space-y-4">
        <h1 className="text-3xl font-bold">Login</h1>

        <button
          onClick={() => signIn("google")}
          className="w-full bg-red-500 text-white p-3 rounded"
        >
          Login with Google
        </button>

        <button
          onClick={() => signIn("credentials")}
          className="w-full bg-black text-white p-3 rounded"
        >
          Login with Email
        </button>
      </div>
    </div>
  );
}
