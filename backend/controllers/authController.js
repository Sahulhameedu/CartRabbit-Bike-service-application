const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register a new user
register = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;
        const user = new User({ name, email, password, phone, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Registration failed' });
    }
};

// Login a user
login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await user.matchPassword(password)) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: user.role });
    } else {
        res.status(400).json({ error: 'Invalid credentials' });
    }
};


module.exports = {
    register, login
};
