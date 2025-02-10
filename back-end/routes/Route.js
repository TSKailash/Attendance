const express = require("express");
const bcrypt = require("bcryptjs"); // For password hashing
const multer = require("multer"); // For image upload
const path = require("path");
const fs = require("fs");
const {User} = require("../models/Schema"); // Assuming you have a `User` model
const router=express.Router()

// Dummy admin credentials (Replace with database check)
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin",
};

router.post("/admin/adminLogin", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    return res.status(200).json({ message: "Login successful", token: "someAuthToken" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Create uploads folder if not exists
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});
const upload = multer({ storage });

// **1. Add Staff (POST /api/admin/addStaff)**
router.post("/admin/addStaff", upload.single("image"), async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Encrypt password
    const image = req.file ? req.file.filename : "default.jpg";

    const newUser = new User({ username, email, password: hashedPassword, image });
    await newUser.save();

    res.status(201).json({ message: "Staff added successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// **2. Get All Staff (GET /api/admin/getStaff)**
router.get("/admin/getStaff", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude passwords
    console.log("Fetched Users:", users); // ✅ Log users
    res.json(users);
  } catch (error) {
    console.error("Error fetching staff:", error); // ✅ Log the exact error
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// **3. Update Staff (PUT /api/admin/updateStaff/:id)**
router.put("/admin/updateStaff/:id", async (req, res) => {
  try {
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, email }, { new: true });

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Staff updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// **4. Delete Staff (DELETE /api/admin/deleteStaff/:id)**
router.delete("/admin/deleteStaff/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Staff deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        image: user.image,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
