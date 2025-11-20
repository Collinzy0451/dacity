import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        setSuccess("Login successful! Redirecting...");
        login(data.user, data.token);
        setTimeout(() => navigate("/"), 800);
      }
    } catch (err) {
      setError("Server error");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="w-full max-w-md p-6 bg-white rounded shadow"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <Button type="submit" className="w-full mb-3">
          Login
        </Button>

        {/* 👇 Added this */}
        <p className="text-center text-sm text-gray-600">
          Not a member?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Login;
