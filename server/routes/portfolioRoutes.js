const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/portfolioController");

// Define API route to get portfolio data
router.get("/about", portfolioController.getPortfolioData);
router.post("/contactForm", portfolioController.contactForm);


module.exports = router;
