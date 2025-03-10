"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
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
};

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});

  // ✅ Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        console.log("No token found. Redirecting to login...");
        router.push("/admin/adminlogin");
        return;
      }

      try {
        const response = await fetch("/api/user/all", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers(users.filter((user) => user.id !== id));
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  // ✅ Open Edit Modal
  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({
      ...user, // Keep existing values
      servicePlan: user.servicePlan || "", // Ensure fields are not undefined
      servicePrice: user.servicePrice || "",
      relation: user.relation || "",
      phone: user.phone || "",
    });
  };
  

  // ✅ Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save Edited User
  const saveUser = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        alert("Authentication error. Please log in again.");
        router.push("/admin/login");
        return;
      }
  
      // Ensure all fields are retained
      const updatedData = {
        name: formData.name || editingUser?.name,
        email: formData.email || editingUser?.email,
        phone: formData.phone || editingUser?.phone,
        servicePlan: formData.servicePlan || editingUser?.servicePlan,
        servicePrice: formData.servicePrice || editingUser?.servicePrice,
        relation: formData.relation || editingUser?.relation,
        deceasedName: formData.deceasedName || editingUser?.deceasedName,
        dateOfBirth: formData.dateOfBirth || editingUser?.dateOfBirth,
        dateOfPassing: formData.dateOfPassing || editingUser?.dateOfPassing,
      };
  
      const response = await fetch(`/api/user/profile/${editingUser?.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData), // Send updated data safely
      });
  
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
  
      const updatedUser = await response.json();
      setUsers(users.map((user) => (user.id === updatedUser.user.id ? updatedUser.user : user)));
  
      alert("User updated successfully!");
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
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
                  <td className="p-2 border">{new Date(user.dateOfBirth).toLocaleDateString()}</td>
                  <td className="p-2 border">{new Date(user.dateOfPassing).toLocaleDateString()}</td>
                  <td className="p-2 border">{user.relation}</td>
                  <td className="p-2 border">{user.servicePlan}</td>
                  <td className="p-2 border">${user.servicePrice}</td>
                  <td className="p-2 border flex gap-2">
                    <button onClick={() => openEditModal(user)} className="bg-blue-500 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                    <button onClick={() => deleteUser(user.id)} className="bg-red-500 text-white px-3 py-1 rounded">
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

      {/* Edit User Modal */}
      {editingUser && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">Edit User</h2>

      {/* Name */}
      <input
        type="text"
        name="name"
        value={formData.name || ""}
        onChange={handleInputChange}
        className="border p-2 w-full mb-2"
        placeholder="Name"
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        value={formData.email || ""}
        onChange={handleInputChange}
        className="border p-2 w-full mb-2"
        placeholder="Email"
      />

      {/* Phone */}
      <input
        type="text"
        name="phone"
        value={formData.phone || ""}
        onChange={handleInputChange}
        className="border p-2 w-full mb-2"
        placeholder="Phone"
      />

      {/* Relation */}
      <input
        type="text"
        name="relation"
        value={formData.relation || ""}
        onChange={handleInputChange}
        className="border p-2 w-full mb-2"
        placeholder="Relation"
      />

      {/* Deceased Name */}
      <input
        type="text"
        name="deceasedName"
        value={formData.deceasedName || ""}
        onChange={handleInputChange}
        className="border p-2 w-full mb-2"
        placeholder="Deceased Name"
      />

      {/* Date of Birth */}
      <input
        type="date"
        name="dateOfBirth"
        value={formData.dateOfBirth || ""}
        onChange={handleInputChange}
        className="border p-2 w-full mb-2"
        placeholder="Date of Birth"
      />

      {/* Date of Passing */}
      <input
        type="date"
        name="dateOfPassing"
        value={formData.dateOfPassing || ""}
        onChange={handleInputChange}
        className="border p-2 w-full mb-2"
        placeholder="Date of Passing"
      />

      {/* Service Plan */}
      <input
        type="text"
        name="servicePlan"
        value={formData.servicePlan || ""}
        onChange={handleInputChange}
        className="border p-2 w-full mb-2"
        placeholder="Service Plan"
      />

      {/* Service Price */}
      <input
        type="number"
        name="servicePrice"
        value={formData.servicePrice || ""}
        onChange={handleInputChange}
        className="border p-2 w-full mb-2"
        placeholder="Service Price"
      />

      {/* Save & Cancel Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={saveUser}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button
          onClick={() => setEditingUser(null)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
