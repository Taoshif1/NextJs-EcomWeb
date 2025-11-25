export default function ProductDetails({ params }) {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Product {params.id}</h1>
      <p className="mt-4 text-gray-600">
        This is the full product description. You can customize this later.
      </p>

      <button
        onClick={() => history.back()}
        className="mt-6 bg-black text-white px-4 py-2 rounded"
      >
        Go Back
      </button>
    </div>
  );
}
