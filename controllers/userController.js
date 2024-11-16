const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {
    const { name, department, id, joiningDate, companyName, password } = req.body;

    try {
        const userExists = await User.findOne({ id });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            department,
            id,
            joiningDate,
            companyName,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { id, password } = req.body;

    try {
        const user = await User.findOne({ id });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update User Profile
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, department, joiningDate, companyName } = req.body;

    try {
        const user = await User.findOne({ id });
        if (!user) return res.status(400).json({ message: 'User not found' });

        user.name = name || user.name;
        user.department = department || user.department;
        user.joiningDate = joiningDate || user.joiningDate;
        user.companyName = companyName || user.companyName;

        await user.save();
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser, updateUser };
