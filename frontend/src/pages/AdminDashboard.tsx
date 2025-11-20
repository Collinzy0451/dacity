import { useEffect, useState } from "react";
import axios from "@/api/axiosConfig";

interface Stats {
  total_users: number;
  total_posts: number;
  total_properties: number;
  pending_properties: number;
  approved_properties: number;
}

interface UserItem {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
}

interface PostItem {
  id: number;
  user_id: number;
  user_name: string;
  content: string;
  image_url?: string | null;
  status: string;
  created_at: string;
}

interface PropertyItem {
  id: number;
  user_id: number;
  user_name: string;
  title: string;
  description?: string | null;
  price?: number | null;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [properties, setProperties] = useState<PropertyItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const token = localStorage.getItem("token") || "";

  const api = axios.create({
    baseURL: "http://127.0.0.1:5000/api",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // fetch stats + lists
  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsRes, usersRes, postsRes, propsRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/users/all"),
        api.get("/admin/posts/all"),
        api.get("/admin/properties/all"),
      ]);

      setStats(statsRes.data as Stats);
      setUsers(usersRes.data as UserItem[]);
      setPosts(postsRes.data as PostItem[]);
      setProperties(propsRes.data as PropertyItem[]);
    } catch (err: any) {
      console.error("Admin fetch error:", err);
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Failed to load admin data";
      setError(String(msg));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // helper to show success and auto-clear
  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // ADMIN ACTIONS
  const handleDeleteUser = async (id: number) => {
    if (!confirm("Delete this user? This is irreversible.")) return;
    setActionLoading(true);
    setError(null);
    try {
      await api.delete(`/admin/users/delete/${id}`);
      showSuccess("User deleted");
      await fetchAll();
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Error deleting user";
      setError(String(msg));
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm("Delete this post?")) return;
    setActionLoading(true);
    setError(null);
    try {
      await api.delete(`/admin/posts/delete/${id}`);
      showSuccess("Post deleted");
      await fetchAll();
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Error deleting post";
      setError(String(msg));
    } finally {
      setActionLoading(false);
    }
  };

  const handleApproveProperty = async (id: number) => {
    setActionLoading(true);
    setError(null);
    try {
      await api.put(`/admin/properties/approve/${id}`);
      showSuccess("Property approved");
      await fetchAll();
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Error approving property";
      setError(String(msg));
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeclineProperty = async (id: number) => {
    if (!confirm("Decline this property?")) return;
    setActionLoading(true);
    setError(null);
    try {
      await api.put(`/admin/properties/decline/${id}`);
      showSuccess("Property declined");
      await fetchAll();
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Error declining property";
      setError(String(msg));
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProperty = async (id: number) => {
    if (!confirm("Delete this property? This is irreversible.")) return;
    setActionLoading(true);
    setError(null);
    try {
      await api.delete(`/admin/properties/delete/${id}`);
      showSuccess("Property deleted");
      await fetchAll();
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Error deleting property";
      setError(String(msg));
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="text-lg">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchAll}
            className="px-3 py-1 rounded bg-slate-100 hover:bg-slate-200"
            disabled={loading || actionLoading}
          >
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded">{error}</div>
      )}
      {successMessage && (
        <div className="bg-green-50 text-green-700 p-3 rounded">
          {successMessage}
        </div>
      )}

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-600">Users</div>
            <div className="text-2xl font-semibold">{stats.total_users}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-600">Posts</div>
            <div className="text-2xl font-semibold">{stats.total_posts}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-600">Properties</div>
            <div className="text-2xl font-semibold">
              {stats.total_properties}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Approved: {stats.approved_properties} • Pending:{" "}
              {stats.pending_properties}
            </div>
          </div>
          <div className="p-4 bg-white rounded shadow col-span-2 md:col-span-2">
            <div className="text-sm text-gray-600">Admin actions</div>
            <div className="mt-2 text-sm text-gray-700">
              Use the tables below to manage users, posts and properties.
            </div>
          </div>
        </div>
      )}

      {/* Users */}
      <section className="bg-white p-4 rounded shadow">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Users</h2>
          <div className="text-sm text-gray-500">{users.length} total</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="text-sm text-gray-600">
                <th className="px-2 py-2">ID</th>
                <th className="px-2 py-2">Name</th>
                <th className="px-2 py-2">Email</th>
                <th className="px-2 py-2">Admin</th>
                <th className="px-2 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                  <tr key={u.id} className="border-t">
                  <td className="px-2 py-2">{index + 1}</td>
                  <td className="px-2 py-2">{u.name}</td>
                  <td className="px-2 py-2">{u.email}</td>
                  <td className="px-2 py-2">{u.is_admin ? "Yes" : "No"}</td>
                  <td className="px-2 py-2">
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="px-2 py-1 text-sm rounded bg-red-50 text-red-700 hover:bg-red-100"
                      disabled={actionLoading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-3 text-center text-gray-500">
                    No users
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Posts */}
      <section className="bg-white p-4 rounded shadow">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Community Posts</h2>
          <div className="text-sm text-gray-500">{posts.length} total</div>
        </div>

        <div className="space-y-3">
          {posts.length > 0 ? (
            posts.map((p) => (
              <div
                key={p.id}
                className="border rounded p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
              >
                <div>
                  <div className="text-sm text-gray-600">
                    {p.user_name} •{" "}
                    <span className="text-xs text-gray-400">
                      {new Date(p.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1 text-gray-800">{p.content}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeletePost(p.id)}
                    className="px-3 py-1 rounded bg-red-50 text-red-700 hover:bg-red-100 text-sm"
                    disabled={actionLoading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500">No posts found.</div>
          )}
        </div>
      </section>

      {/* Properties */}
      <section className="bg-white p-4 rounded shadow">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Property Listings</h2>
          <div className="text-sm text-gray-500">{properties.length} total</div>
        </div>

        <div className="space-y-3">
          {properties.length > 0 ? (
            properties.map((pr) => (
              <div
                key={pr.id}
                className="border rounded p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
              >
                <div>
                  <div className="text-sm text-gray-600">
                    {pr.user_name} •{" "}
                    <span className="text-xs text-gray-400">
                      {new Date(pr.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1 font-medium text-gray-800">
                    {pr.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    {pr.description || "No description"}
                  </div>
                  <div className="text-sm text-gray-700 mt-1">
                    Price: {pr.price ?? "N/A"} • Status: {pr.status}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {pr.status !== "approved" && (
                    <button
                      onClick={() => handleApproveProperty(pr.id)}
                      className="px-3 py-1 rounded bg-green-50 text-green-700 hover:bg-green-100 text-sm"
                      disabled={actionLoading}
                    >
                      Approve
                    </button>
                  )}

                  {pr.status !== "declined" && (
                    <button
                      onClick={() => handleDeclineProperty(pr.id)}
                      className="px-3 py-1 rounded bg-yellow-50 text-yellow-800 hover:bg-yellow-100 text-sm"
                      disabled={actionLoading}
                    >
                      Decline
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteProperty(pr.id)}
                    className="px-3 py-1 rounded bg-red-50 text-red-700 hover:bg-red-100 text-sm"
                    disabled={actionLoading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500">No properties found.</div>
          )}
        </div>
      </section>

      <div className="text-sm text-gray-500">
        Tip: actions refresh automatically. Use "Refresh" to re-fetch at any time.
      </div>
    </div>
  );
};

export default AdminDashboard;
