import { useLocation, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user; // ✅ Get user from state

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <img
          src={`http://localhost:5000/uploads/${user.image}`}
          alt="User"
          className="w-32 h-32 rounded-full mb-4"
        />
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
