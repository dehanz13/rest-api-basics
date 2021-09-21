const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

// Create express app
const app = express();

// Routes
const postsRoutes = require("./routes/api/posts");

// BodyParser Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));

// User routes
app.use("/api/posts", postsRoutes);

// Starting server
app.listen(PORT, () => console.log(`Server runs at port ${PORT}`));
