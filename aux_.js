const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Your user model

// Register route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    // Save the user to the database
    const savedUser = await user.save();
    
    // Respond with the saved user (without password)
    res.status(201).json({ name: savedUser.name, email: savedUser.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: "Invalid email or password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send({ message: "Invalid email or password." });

    // Generate JWT
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      "your_jwt_secret_key",
      { expiresIn: "1h" }
    );

    res.send({ token }); // Send JWT to client
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
