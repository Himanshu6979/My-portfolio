const express = require("express");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 4002;

const portfolioRoutes = require("./routes/portfolioRoutes");

const app = express();

app.use(express.json());
// Middleware to allow cross-origin requests
app.use(cors());

// Serve static files (e.g., images)
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Use portfolio routes
app.use("/api", portfolioRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
