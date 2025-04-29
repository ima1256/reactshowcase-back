const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

//Google authentication
const passport = require("passport");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
require("./config/passportSetup");

const app = express();
app.use(express.json()); // to parse JSON bodies
app.use(cors());

// OR specify allowed origins explicitly:
app.use(
  cors({
    origin: ["http://localhost:3000"], // Add your frontend's origin
  })
);

// Protected Dashboard route
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

//Google authentication code START
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(authRoutes);

// Routes
// app.use("/api/users", userRoutes);
app.get("/dashboard", isAuthenticated, (req, res) => {
  res.send(`Welcome ${req.user.name}! <a href="/auth/logout">Logout</a>`);
});

// Home route
app.get("/", (req, res) => {
  res.send('<h1>Home</h1><a href="/auth/google">Login with Google</a>');
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//External functions
const connectDB = async (uri) => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

module.exports = { app, connectDB };
