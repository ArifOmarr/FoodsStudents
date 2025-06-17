const express = require('express');
const router = express.Router();
const db = require('../config/db.config');

// Get all menu items or by restaurant_id
router.get('/', async (req, res) => {
    try {
        const { restaurant_id } = req.query;
        let query = 'SELECT * FROM menu_items';
        let params = [];
        if (restaurant_id) {
            query += ' WHERE restaurant_id = ?';
            params.push(restaurant_id);
        }
        const [menuItems] = await db.query(query, params);
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get menu items by restaurant ID
router.get('/restaurant/:restaurantId', async (req, res) => {
    try {
        const [menuItems] = await db.query(
            'SELECT * FROM menu_items WHERE restaurant_id = ?',
            [req.params.restaurantId]
        );
        res.json({ success: true, data: menuItems });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get menu item by ID
router.get('/:id', async (req, res) => {
    try {
        const [menuItems] = await db.query(
            'SELECT * FROM menu_items WHERE id = ?',
            [req.params.id]
        );
        
        if (menuItems.length === 0) {
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }
        
        res.json({ success: true, data: menuItems[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Create new menu item
router.post('/', async (req, res) => {
    try {
        const { restaurant_id, title, description, price, category, image_url } = req.body;
        
        const [result] = await db.query(
            'INSERT INTO menu_items (restaurant_id, title, description, price, category, image_url) VALUES (?, ?, ?, ?, ?, ?)',
            [restaurant_id, title, description, price, category, image_url]
        );
        
        res.status(201).json({
            success: true,
            message: 'Menu item created successfully',
            menuItemId: result.insertId
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update menu item
router.put('/:id', async (req, res) => {
    try {
        const { title, description, price, category, image_url } = req.body;
        const menuItemId = req.params.id;
        
        let updateFields = [];
        let values = [];
        
        if (title) {
            updateFields.push('title = ?');
            values.push(title);
        }
        if (description) {
            updateFields.push('description = ?');
            values.push(description);
        }
        if (price) {
            updateFields.push('price = ?');
            values.push(price);
        }
        if (category) {
            updateFields.push('category = ?');
            values.push(category);
        }
        if (image_url) {
            updateFields.push('image_url = ?');
            values.push(image_url);
        }
        
        if (updateFields.length === 0) {
            return res.status(400).json({ success: false, message: 'No fields to update' });
        }
        
        values.push(menuItemId);
        
        const [result] = await db.query(
            `UPDATE menu_items SET ${updateFields.join(', ')} WHERE id = ?`,
            values
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }
        
        res.json({ success: true, message: 'Menu item updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete menu item
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM menu_items WHERE id = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }
        
        res.json({ success: true, message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router; 