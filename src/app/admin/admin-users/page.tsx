"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminUsersPage() {
  const router = useRouter();
  const [admins, setAdmins] = useState<
    { _id: string; email: string; role: string; createdAt: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  // ✅ Fetch Admins & User Role
  useEffect(() => {
    const fetchAdmins = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        console.log("No token found. Redirecting to login...");
        router.push("/admin/adminlogin");
        return;
      }

      try {
        // ✅ Fetch the logged-in admin's role
        const profileResponse = await fetch("/api/admin/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!profileResponse.ok) {
          throw new Error("Unauthorized access.");
        }

        const profileData = await profileResponse.json();

        // ✅ Check if the logged-in user is a Super Admin
        setIsSuperAdmin(profileData.role === "superadmin");

        // ✅ Fetch All Admin Users
        const response = await fetch("/api/admin/all", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch admin users");
        }

        const data = await response.json();
        setAdmins(data.admins);
      } catch (err) {
        setError("Error fetching admins");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, [router]);

  // ✅ Delete Admin (Only Super Admins)
  const deleteAdmin = async (id: string) => {
    if (!isSuperAdmin) {
      alert("You do not have permission to delete admins.");
      return;
    }

    if (!confirm("Are you sure you want to delete this admin?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        alert("Authentication error. Please log in again.");
        router.push("/admin/login");
        return;
      }

      const response = await fetch(`/api/admin/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete admin");
      }

      // ✅ Remove admin from UI
      setAdmins(admins.filter((admin) => admin._id !== id));
      alert("Admin deleted successfully!");
    } catch (error) {
      console.error("Error deleting admin:", error);
      alert("Failed to delete admin");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Admin Users</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Created At</th>
                {isSuperAdmin && <th className="p-2 border">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {admins.length > 0 ? (
                admins.map((admin) => (
                  <tr key={admin._id} className="border-t">
                    <td className="p-2 border">{admin.email}</td>
                    <td className="p-2 border">{admin.role}</td>
                    <td className="p-2 border">
                      {new Date(admin.createdAt).toLocaleDateString()}
                    </td>
                    {isSuperAdmin && (
                      <td className="p-2 border">
                        <button
                          onClick={() => deleteAdmin(admin._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={isSuperAdmin ? 4 : 3} className="p-2 text-center">
                    No admins found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
