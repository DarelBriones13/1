const express = require("express");
const path = require("path");
const { login } = require("../controllers/authController");
const { saveCategory, getCategories } = require("../controllers/categoryController");
const db = require("../models");

const routes = express.Router();

// Serve index.ejs at the /login route
routes.get("/login", (req, res) => {
  res.render("index"); // No need for file extension if you're using EJS
});

// Serve dashboard.ejs after successful login
routes.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

// Serve orders.ejs at the /orders route
routes.get("/orders", (req, res) => {
  res.render("orders");
});

// Serve takeorders.ejs at the /takeorders route
routes.get("/takeorders", (req, res) => {
  res.render("takeorders");
});

// Serve categories.ejs at the /categories route with categories data
routes.get("/categories", async (req, res) => {
  try {
    const categories = await getCategories(); // Fetch categories from the controller
    res.render("categories", { categories }); // Pass categories to the view
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send('Internal server error');
  }
});

// Add this route to fetch categories list
routes.get("/categories/list", async (req, res) => {
  try {
      const categories = await getCategories(); // Fetch categories from the controller
      res.json(categories); // Send categories as JSON
  } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).send('Internal server error');
  }
});

// Update category by ID
routes.put("/categories/:id", async (req, res) => {
  const categoryId = req.params.id; // Get ID from the request parameters
  const { category_name, category_description } = req.body; // Get updated data from request body

  try {
    const category = await db.Category.findByPk(categoryId); // Find the category
    if (!category) {
      return res.status(404).json({ message: 'Category not found.' }); // Handle not found case
    }

    // Update the category
    category.category_name = category_name;
    category.category_description = category_description;
    await category.save(); // Save changes to the database

    res.json(category); // Respond with the updated category
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message }); // Include error message in response
  }
});


// Handle form submission for saving categories
routes.post("/categories", saveCategory);

// Serve products.ejs at the /products route
routes.get("/products", (req, res) => {
  res.render("products");
});

// Serve user.ejs at the /users route
routes.get("/users", (req, res) => {
  res.render("user");
});

// Serve bundles.ejs at the /bundles route
routes.get("/bundles", (req, res) => {
  res.render("bundles");
});

// Login route
routes.post("/login", login);



module.exports = routes;
