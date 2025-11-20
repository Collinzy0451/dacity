import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminUsers = () => {
  const navigate = useNavigate();

const handleDelete = async (userId: number) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://127.0.0.1:5000/api/admin/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to delete user");

    alert(`User ${userId} deleted successfully`);
    // Optionally refresh user list here
  } catch (err) {
    console.error(err);
    alert("Error deleting user");
  }
};

const handleUpgrade = async (userId: number) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://127.0.0.1:5000/api/admin/users/${userId}/upgrade`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to upgrade user");

    alert(`User ${userId} upgraded successfully`);
    // Optionally refresh user list here
  } catch (err) {
    console.error(err);
    alert("Error upgrading user");
  }
};
 

  // Example placeholder users
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-gray-600">
        <span className="cursor-pointer text-blue-600" onClick={() => navigate("/admin")}>
          Dashboard
        </span>{" "}
        &gt; User Management
      </div>

      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border flex gap-2">
                <Button onClick={() => handleDelete(user.id)} variant="destructive">
                  Delete
                </Button>
                <Button onClick={() => handleUpgrade(user.id)}>Upgrade</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
