const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    joiningDate: { type: Date, required: true },
    companyName: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
