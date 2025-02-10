import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRound, Lock, Mail } from "lucide-react";

const UserSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });

      console.log("Login Success:", response.data);
      setUser(response.data.user);

      navigate("/UserProfile", { state: { user: response.data.user } });

    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed. Please try again.";
      setError(errorMsg);
      console.error("Login failed:", errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-amber-300 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-amber-500 text-white p-6 text-center">
          <UserRound size={64} className="mx-auto mb-4" />
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-white/80">Sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex items-center">
              <Lock className="mr-2 text-red-500" />
              {error}
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" />
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 pl-10 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required 
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pl-10 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-amber-500 text-white p-3 rounded-lg hover:bg-amber-600 transition duration-300 flex items-center justify-center"
          >
            <UserRound className="mr-2" /> Sign In
          </button>

        </form>
      </div>
    </div>
  );
};

export default UserSignIn;