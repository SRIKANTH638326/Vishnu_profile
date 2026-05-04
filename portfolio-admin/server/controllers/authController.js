const User = require('../models/User');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // In a real app, you would check the database and use bcrypt
        // For now, let's implement a basic check or look for the user
        
        // Mock check for demonstration if database is not set up with users yet
        if (email === "admin@example.com" && password === "admin123") {
            return res.json({ success: true, message: "Login successful" });
        }

        // Real check if user exists in DB
        const user = await User.findOne({ email });
        if (user && user.password === password) {
            return res.json({ success: true, message: "Login successful" });
        }

        res.status(401).json({ success: false, message: "Invalid email or password" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
