import { authGuard } from "@/app/utils/auth";

export default async function DashboardPage() {
  await authGuard();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Add Product</h1>

      <form className="space-y-4 max-w-md">
        <input className="border p-3 w-full" placeholder="Title" />
        <input className="border p-3 w-full" placeholder="Short description" />
        <textarea className="border p-3 w-full" placeholder="Full description" />
        <input className="border p-3 w-full" placeholder="Price" />

        <button className="bg-black text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
