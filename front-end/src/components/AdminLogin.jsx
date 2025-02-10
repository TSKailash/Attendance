import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/admin/adminLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/AdminDashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-100 to-teal-300">
      <div className="bg-white w-96 p-8 rounded-xl shadow-2xl border-t-4 border-coral-500">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-teal-700 flex items-center justify-center">
            🔑 Admin Login
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex items-center">
              ⚠️ <span className="ml-2">{error}</span>
            </div>
          )}

          <div>
            <label className="block text-teal-800 mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-400"
              required
            />
          </div>

          <div>
            <label className="block text-teal-800 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-coral-500 to-orange-500 text-white 
             p-3 rounded-lg shadow-lg font-semibold text-lg 
             hover:from-coral-600 hover:to-orange-600 
             transition-all duration-300 transform hover:scale-105 active:scale-95 
             flex items-center justify-center gap-2"
          >
            🔓 Login
          </button>

        </form>
      </div>  
    </div>
  );
};

export default AdminLogin;
