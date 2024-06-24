// controllers/ctegoryControllers.js
const Category = require('../models/Category');

// Add a new category
exports.addCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newCategory = new Category({
            name,
            description,
        });

        const category = await newCategory.save();
        res.json(category);
    } catch (err) {
        console.error('Error in addCategory:', err.message);  // Log the error message
        console.error('Error stack:', err.stack);            // Log the error stack trace
        res.status(500).send('Server error');
    }
};

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        console.error('Error in getCategories:', err.message);  // Log the error message
        console.error('Error stack:', err.stack);               // Log the error stack trace
        res.status(500).send('Server error');
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        let category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        category.name = name || category.name;
        category.description = description || category.description;

        await category.save();
        res.json(category);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        let category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        await category.remove();
        res.json({ msg: 'Category removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
