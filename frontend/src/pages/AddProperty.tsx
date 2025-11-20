import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const res = await fetch("http://127.0.0.1:5000/api/users/properties/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();

      if (!res.ok) setError(data.message || "Failed to add property");
      else {
        setSuccess("Property added successfully!");
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
        <h2 className="text-2xl font-bold mb-4">Add Property</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}
        <input
          type="text"
          placeholder="Property Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <textarea
          placeholder="Property Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <Button type="submit" className="w-full">
          Add Property
        </Button>
      </form>
    </div>
  );
};

export default AddProperty;
