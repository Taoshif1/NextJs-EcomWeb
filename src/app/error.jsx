"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center text-center p-8">
        <div>
          <h1 className="text-3xl font-bold text-red-600 mb-3">
            Something went wrong
          </h1>

          <p className="text-gray-700 mb-6">{error?.message}</p>

          <button
            onClick={reset}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
