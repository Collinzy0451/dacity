import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminPosts = () => {
  const navigate = useNavigate();

  const handleDelete = async (postId: number) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://127.0.0.1:5000/api/admin/posts/${postId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Failed to delete post");

    alert(`Post ${postId} deleted successfully`);
    // Optionally refresh posts list here
  } catch (err) {
    console.error(err);
    alert("Error deleting post");
  }
};


  const posts = [
    { id: 1, title: "Community Announcement", author: "John Doe" },
    { id: 2, title: "Event Update", author: "Jane Smith" },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-gray-600">
        <span className="cursor-pointer text-blue-600" onClick={() => navigate("/admin")}>
          Dashboard
        </span>{" "}
        &gt; Community Posts
      </div>

      <h1 className="text-2xl font-bold mb-4">Community Posts</h1>

      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Author</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="p-2 border">{post.id}</td>
              <td className="p-2 border">{post.title}</td>
              <td className="p-2 border">{post.author}</td>
              <td className="p-2 border flex gap-2">
                <Button onClick={() => handleDelete(post.id)} variant="destructive">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPosts;
