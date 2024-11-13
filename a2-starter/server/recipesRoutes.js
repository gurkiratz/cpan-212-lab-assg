const express = require('express');
const Recipe = require('./recipeModel')

const router = express.Router();

// Get all recipes
router.get('/recipe', async (req, res) => {
  try {
    const recipes = await Recipe.find()
    res.json(recipes)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

// // Get recipe by ID
router.get('/recipe/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

// // Create a new recipe
router.post('/recipe', async (req, res) => {
  const recipe = new Recipe({
    name: req.body.name,
    description: req.body.description,
    difficulty: req.body.difficulty,
    ingredients: req.body.ingredients,
    steps: req.body.steps
  });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

// Update a recipe by ID
router.put('/recipe/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    recipe.name = req.body.name || recipe.name;
    recipe.description = req.body.description || recipe.description;
    recipe.difficulty = req.body.difficulty || recipe.difficulty;
    recipe.ingredients = req.body.ingredients || recipe.ingredients;
    recipe.steps = req.body.steps || recipe.steps;

    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a recipe by ID
router.delete('/recipe/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    await recipe.deleteOne();
    res.json({ message: 'Recipe deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;