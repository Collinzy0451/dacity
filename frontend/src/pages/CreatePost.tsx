import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { token } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const res = await fetch("http://127.0.0.1:5000/api/users/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();

      if (!res.ok) setError(data.message || "Failed to create post");
      else {
        setSuccess("Post created successfully!");
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="w-full max-w-md p-6 bg-white rounded shadow" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Create Post</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}
        <textarea
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <Button type="submit" className="w-full">
          Post
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
