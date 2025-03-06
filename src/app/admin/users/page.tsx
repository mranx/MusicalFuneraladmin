"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<
    {
      id: string;
      deceasedName: string;
      directorCompany: string | null;
      name: string;
      email: string;
      phone: string;
      relation: string;
      servicePlan: string;
      servicePrice: string;
      dateOfBirth: string;
      dateOfPassing: string;
      createdAt: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        console.log("No token found. Redirecting to login...");
        router.push("/admin/login");
        return;
      }

      try {
        const response = await fetch("/api/user/all", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Unauthorized access.");
        }

        const data = await response.json();
        setUsers(data.users);
      } catch (err) {
        setError("Error fetching users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [router]);

  // ✅ Delete User
  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        alert("Authentication error. Please log in again.");
        router.push("/admin/login");
        return;
      }

      const response = await fetch(`/api/user/profile/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // ✅ Remove user from UI
      setUsers(users.filter((user) => user.id !== id));
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <table className="w-full border border-gray-300 rounded-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Deceased Name</th>
              <th className="p-2 border">Date of Birth</th>
              <th className="p-2 border">Date of Passing</th>
              <th className="p-2 border">Relation</th>
              <th className="p-2 border">Service Plan</th>
              <th className="p-2 border">Service Price</th>
              <th className="p-2 border">Created At</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.phone}</td>
                  <td className="p-2 border">{user.deceasedName}</td>
                  <td className="p-2 border">
                    {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="p-2 border">
                    {user.dateOfPassing ? new Date(user.dateOfPassing).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="p-2 border">{user.relation}</td>
                  <td className="p-2 border">{user.servicePlan}</td>
                  <td className="p-2 border">${user.servicePrice}</td>
                  <td className="p-2 border">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="p-2 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
