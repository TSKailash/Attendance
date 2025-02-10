import { useEffect, useState } from "react";
import { Trash2, Plus, UserPlus, Image, Mail, User } from "lucide-react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ username: "", email: "", password: "", image: null });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/getStaff");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("image", formData.image);

    try {
      const response = await fetch("http://localhost:5000/api/admin/addStaff", {
        method: "POST",
        body: form,
      });
      if (response.ok) {
        fetchUsers();
        setFormData({ username: "", email: "", password: "", image: null });
        setPreviewImage(null);
        alert("Staff added successfully");
      }
    } catch (error) {
      console.error("Error adding staff:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      try {
        await fetch(`http://localhost:5000/api/admin/deleteStaff/${id}`, { method: "DELETE" });
        fetchUsers();
      } catch (error) {
        console.error("Error deleting staff:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-teal-600 text-white p-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center">
            <UserPlus className="mr-3" /> Admin Dashboard
          </h1>
        </div>

        <div className="p-8 grid md:grid-cols-3 gap-8">
          {/* Add Staff Form */}
          <div className="md:col-span-1 bg-teal-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-teal-800 flex items-center">
              <Plus className="mr-2" /> Add New Staff
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500" />
                <input 
                  type="text" 
                  name="username" 
                  placeholder="Username" 
                  value={formData.username}
                  onChange={handleChange} 
                  required 
                  className="w-full p-3 pl-10 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500" />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleChange} 
                  required 
                  className="w-full p-3 pl-10 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="relative">
                <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500" />
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  value={formData.password}
                  onChange={handleChange} 
                  required 
                  className="w-full p-3 pl-10 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500" />
                <input 
                  type="file" 
                  name="image" 
                  accept="image/*" 
                  onChange={handleChange} 
                  className="w-full p-3 pl-10 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              {previewImage && (
                <div className="mt-4 flex justify-center">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded-full border-4 border-teal-300"
                  />
                </div>
              )}
              <button 
                type="submit" 
                className="w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition duration-300 flex items-center justify-center"
              >
                <Plus className="mr-2" /> Add Staff
              </button>
            </form>
          </div>

          {/* Staff List */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-md">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-teal-800 flex items-center">
                <UserPlus className="mr-2" /> Staff List
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-teal-100 text-teal-800">
                      <th className="p-3 text-left">Image</th>
                      <th className="p-3 text-left">Username</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} className="border-b hover:bg-teal-50 transition">
                        <td className="p-3">
                          <img 
                            src={`http://localhost:5000/uploads/${user.image}`} 
                            alt="Profile" 
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </td>
                        <td className="p-3">{user.username}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3 text-center">
                          <button 
                            onClick={() => handleDelete(user._id)} 
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center justify-center mx-auto"
                          >
                            <Trash2 className="mr-2" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;