const Expense = require('../models/Expense');
const Category = require('../models/Category');  // Add this line

// Add an expense
exports.addExpense = async (req, res) => {
    const { amount, description, category } = req.body;
    try {
        const categoryObject = await Category.findById(category);
        if (!categoryObject) {
            return res.status(400).json({ msg: 'Category not found' });
        }

        const newExpense = new Expense({
            amount,
            description,
            category: categoryObject._id,
            createdBy: req.user.id,
        });

        const expense = await newExpense.save();
        res.json(expense);
    } catch (err) {
        console.error('Error in addExpense:', err.message);  // Log the error message
        console.error('Error stack:', err.stack);            // Log the error stack trace
        res.status(500).send('Server error');
    }
};

// Get all expenses
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ createdBy: req.user.id }).populate('category', 'name');
        res.json(expenses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update an expense
exports.updateExpense = async (req, res) => {
    const { amount, description, category } = req.body;
    try {
        let expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ msg: 'Expense not found' });
        }

        // Ensure user owns expense
        if (expense.createdBy.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        expense.amount = amount || expense.amount;
        expense.description = description || expense.description;
        expense.category = category || expense.category;

        await expense.save();
        res.json(expense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
    try {
        let expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ msg: 'Expense not found' });
        }

        // Ensure user owns expense
        if (expense.createdBy.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await expense.remove();
        res.json({ msg: 'Expense removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
