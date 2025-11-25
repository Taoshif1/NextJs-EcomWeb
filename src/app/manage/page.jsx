import { authGuard } from "@/app/utils/auth";

export default async function ManageProducts() {
  await authGuard();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      <div className="border rounded p-4">
        <p>No products added yet.</p>
      </div>
    </div>
  );
}
