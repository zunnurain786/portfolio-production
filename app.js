const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const exp = require("constants");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//static file access
app.use(express.static(path.join(__dirname, "./client/dist")));

// Routes
app.use("/api/v1/portfolio", require("./routes/portfolioRoute"));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    success: false,
    message: "Something went wrong! Please try again later.",
  });
});

// Define the port
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
