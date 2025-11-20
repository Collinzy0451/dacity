import React, { useEffect, useState } from "react";
import axios from "@/api/axiosConfig";

// Safe runtime guard for Axios-like error
const isAxiosError = (error: any): error is { response?: { data?: any } } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  );
};

// Interfaces
interface Post {
  id: number;
  content: string;
  image_url?: string;
  created_at: string;
}

interface Property {
  id: number;
  user_id?: number;
  title: string;
  description: string;
  price: string | number;
  status: string;
  created_at: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  image_url?: string;
  listingType?: string;
  type?: string;
}

interface UserProfile {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  profile_image_url?: string;
}

// Axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api/users",
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const UserDashboard: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [activeTab, setActiveTab] = useState<"stats" | "posts" | "properties" | "admin">("stats");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Fetch profile
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await api.get("/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data as UserProfile);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to load profile");
      } else {
        setError("Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await api.get("/posts/my-posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((data as any).posts || (data as Post[]));
    } catch (err) {
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProperties = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get<{ properties: Property[] }>(
        "/api/users/properties/my-properties",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProperties(res.data.properties || []);
    } catch (err) {
      console.error("Error loading user properties:", err);
      setProperties([]);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const token = localStorage.getItem("token");

      const res = await api.post("/profile/upload-image", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const data = res.data as { image_url?: string };
      setProfile((prev) =>
        prev ? { ...prev, profile_image_url: data.image_url } : prev
      );
    } catch (err) {
      setError("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchPosts();
    fetchUserProperties();
  }, []);

  const deletePost = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await api.delete(`/posts/delete/${id}`);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      setError("Failed to delete post");
    }
  };

  const deleteProperty = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      await api.delete(`/properties/delete/${id}`);
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      setError("Failed to delete property");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {profile && (
        <div className="mb-6 p-4 border rounded bg-gray-50 flex items-center gap-6">
          {/* Profile Image */}
          <div>
            <img
  src={
    profile.profile_image_url
      ? profile.profile_image_url.startsWith("http")
        ? profile.profile_image_url
        : `http://127.0.0.1:5000${profile.profile_image_url}`
      : "https://placehold.co/120x120?text=No+Image"
  }
  alt="Profile"
  className="w-28 h-28 object-cover rounded-full border"
/>


            <label className="mt-2 block">
              <span className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded text-sm">
                {uploading ? "Uploading..." : "Change Photo"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {/* Basic Profile Info */}
          <div>
            <h2 className="text-xl font-semibold mb-1">Profile</h2>
            <p>
              <strong>Name:</strong> {profile.name}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <p>
              <strong>Admin:</strong> {profile.is_admin ? "Yes" : "No"}
            </p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setActiveTab("stats")}
          className={`px-4 py-2 rounded ${
            activeTab === "stats" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Stats
        </button>

        <button
          onClick={() => setActiveTab("posts")}
          className={`px-4 py-2 rounded ${
            activeTab === "posts" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          My Posts
        </button>

        <button
          onClick={() => setActiveTab("properties")}
          className={`px-4 py-2 rounded ${
            activeTab === "properties" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          My Properties
        </button>

        {profile?.is_admin && (
          <button
            onClick={() => (window.location.href = "/admin")}
            className="px-4 py-2 rounded bg-purple-500 text-white"
          >
            Admin Dashboard
          </button>
        )}
      </div>

      {/* Stats */}
      {activeTab === "stats" && (
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border rounded bg-green-50">
            Posts: {posts.length}
          </div>
          <div className="p-4 border rounded bg-yellow-50">
            Properties: {properties.length}
          </div>
          <div className="p-4 border rounded bg-blue-50">
            Profile Loaded
          </div>
        </div>
      )}

      {/* Posts */}
      {activeTab === "posts" && (
        <div className="space-y-4">
          {posts.map((p) => (
            <div key={p.id} className="p-4 border rounded flex justify-between items-center">
              <div>
                <p>{p.content}</p>
                {p.image_url && (
                  <img src={p.image_url} className="mt-2 max-w-xs" />
                )}
                <p className="text-sm text-gray-500">
                  {new Date(p.created_at).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => deletePost(p.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Properties */}
      {activeTab === "properties" && (
        <div className="space-y-4">
          {properties.map((p) => (
            <div key={p.id} className="p-4 border rounded flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p>{p.description}</p>
                <p>Price: {p.price}</p>
                <p>Status: {p.status}</p>
                <p className="text-sm text-gray-500">
                  {new Date(p.created_at).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => deleteProperty(p.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
