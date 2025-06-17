const express = require('express');
const router = express.Router();
const db = require('../config/db.config');

// Get all restaurants
router.get('/', async (req, res) => {
    console.log('GET /api/restaurants called');
    try {
        const [restaurants] = await db.query('SELECT * FROM restaurants');
        console.log('Restaurants fetched:', restaurants);
        res.json(restaurants); // Return flat array for frontend compatibility
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get restaurant by ID
router.get('/:id', async (req, res) => {
    try {
        const [restaurants] = await db.query(
            'SELECT * FROM restaurants WHERE id = ?',
            [req.params.id]
        );
        
        if (restaurants.length === 0) {
            return res.status(404).json({ success: false, message: 'Restaurant not found' });
        }
        
        // Get menu items for this restaurant
        const [menuItems] = await db.query(
            'SELECT * FROM menu_items WHERE restaurant_id = ?',
            [req.params.id]
        );
        
        res.json({
            success: true,
            data: {
                ...restaurants[0],
                menu: menuItems
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Create new restaurant
router.post('/', async (req, res) => {
    try {
        const { name, cuisine, delivery_time, image_url, owner_id } = req.body;
        
        const [result] = await db.query(
            'INSERT INTO restaurants (name, cuisine, delivery_time, image_url, owner_id) VALUES (?, ?, ?, ?, ?)',
            [name, cuisine, delivery_time, image_url, owner_id]
        );
        
        res.status(201).json({
            success: true,
            message: 'Restaurant created successfully',
            restaurantId: result.insertId
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update restaurant
router.put('/:id', async (req, res) => {
    try {
        const { name, cuisine, delivery_time, image_url, owner_id } = req.body;
        const restaurantId = req.params.id;
        
        let updateFields = [];
        let values = [];
        
        if (name) {
            updateFields.push('name = ?');
            values.push(name);
        }
        if (cuisine) {
            updateFields.push('cuisine = ?');
            values.push(cuisine);
        }
        if (delivery_time) {
            updateFields.push('delivery_time = ?');
            values.push(delivery_time);
        }
        if (image_url) {
            updateFields.push('image_url = ?');
            values.push(image_url);
        }
        if (owner_id) {
            updateFields.push('owner_id = ?');
            values.push(owner_id);
        }
        
        if (updateFields.length === 0) {
            return res.status(400).json({ success: false, message: 'No fields to update' });
        }
        
        values.push(restaurantId);
        
        const [result] = await db.query(
            `UPDATE restaurants SET ${updateFields.join(', ')} WHERE id = ?`,
            values
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Restaurant not found' });
        }
        
        res.json({ success: true, message: 'Restaurant updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete restaurant
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM restaurants WHERE id = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Restaurant not found' });
        }
        
        res.json({ success: true, message: 'Restaurant deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router; 