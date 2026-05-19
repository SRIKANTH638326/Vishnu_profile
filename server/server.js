const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve Static Files
const path = require('path');
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/experience', require('./routes/experienceRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/socials', require('./routes/socialRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/images', require('./routes/imageRoutes'));

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Health Check Route
app.get('/', (req, res) => {
    res.send('<h1>Vishnu Portfolio Backend is Running 🚀</h1><p>Visit /api/auth/login to test authentication.</p>');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
