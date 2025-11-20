import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "@/api/axiosConfig";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
}

interface RegisterResponse {
  message: string;
  token: string;
  user: UserProfile;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const { data } = await axios.post<RegisterResponse>("/api/auth/register", {
        name,
        email,
        password
      });

      setProfile(data.user);
      setMessage(data.message);
      localStorage.setItem("token", data.token);

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/account");
      }, 1000);

    } catch (err: any) {
      setError(err.response?.data?.error || "Unknown error occurred");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "#f0f2f5",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        background: "#fff",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Register</h1>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}
        {profile && <p style={{ textAlign: "center" }}>Welcome, {profile.name}!</p>}

        {!profile && (
          <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "16px"
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "16px"
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "16px"
              }}
            />

            <button
              type="submit"
              style={{
                padding: "12px",
                borderRadius: "8px",
                background: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "16px",
                border: "none",
                cursor: "pointer",
                transition: "0.3s"
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Register
            </button>

            {/* 👇 Added login link */}
            <p style={{ textAlign: "center", fontSize: "14px", color: "#555" }}>
              Already a member?{" "}
              <Link to="/login" style={{ color: "#4b6cb7", textDecoration: "underline" }}>
                Login
              </Link>
            </p>

          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
