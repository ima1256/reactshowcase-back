const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .send({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret_key");
    req.user = decoded; // Attach the decoded user info to the request
    next(); // Pass control to the next middleware or route handler
  } catch (ex) {
    return res.status(400).send({ message: "Invalid token." });
  }
};

router.post(
  "/register",
  [
    body("name").isString().withMessage("Name must be a string"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isString().withMessage("Invalid password")
  ],
  async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({email})

    if (userExists) {
      return res.status(400).json({ message: 'User already exists'})
    }

    const user = new User({
      name,
      email, 
      password: password
    })

    try {
      const savedUser = await user.save()

      res.status(201).json({ name: savedUser.name, email: savedUser.email})
    } catch (err) {
      res.status(500).json({ error: err.message })
    }

  }
);

// Create a user
router.post("/", async (req, res) => {
  console.log("Incoming user data:", req.body); // Debug log

  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user by id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

router.patch(
  "/:id",
  [
    body("name").isString().withMessage("Name must be a string"),
    body("email").isEmail().withMessage("Invalid email format"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
