import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user, token, login } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!token) return;

  try {
    const res = await fetch(`http://127.0.0.1:5000/api/users/profile/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Update failed");
    } else {
      setSuccess("Profile updated successfully!");
      login({ ...user, name, email }, token);
      setTimeout(() => navigate("/dashboard"), 1000);
    }
  } catch (err) {
    console.error(err);
    setError("Server error");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="w-full max-w-md p-6 bg-white rounded shadow" onSubmit={handleUpdate}>
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />

        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <Button type="submit" className="w-full">
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
