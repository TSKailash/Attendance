const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const adminRoutes = require('./routes/Route');
const path = require("path"); // ✅ Add this line


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow frontend requests
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allow necessary methods
    allowedHeaders: 'Content-Type,Authorization', // Allow headers
    credentials: true // Enable credentials (cookies, sessions, etc.)
}));
app.use(express.json()); // JSON Middleware (should be before routes)

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { // Use dotenv for security
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api', adminRoutes); // Use only one route prefix
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Default Route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
