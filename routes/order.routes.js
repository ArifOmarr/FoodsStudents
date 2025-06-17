const express = require('express');
const router = express.Router();
const db = require('../config/db.config');

// Get all orders
router.get('/', async (req, res) => {
    try {
        const [orders] = await db.query(`
            SELECT o.*, u.username, r.name as restaurant_name
            FROM orders o
            JOIN users u ON o.user_id = u.id
            JOIN restaurants r ON o.restaurant_id = r.id
            ORDER BY o.created_at DESC
        `);
        
        // Get order items for each order
        for (let order of orders) {
            const [items] = await db.query(`
                SELECT oi.*, mi.title, mi.image_url
                FROM order_items oi
                JOIN menu_items mi ON oi.menu_item_id = mi.id
                WHERE oi.order_id = ?
            `, [order.id]);
            order.items = items;
        }
        
        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get orders by user ID
router.get('/user/:userId', async (req, res) => {
    try {
        const [orders] = await db.query(`
            SELECT o.*, r.name as restaurant_name
            FROM orders o
            LEFT JOIN restaurants r ON o.restaurant_id = r.id
            WHERE o.user_id = ?
            ORDER BY o.created_at DESC
        `, [req.params.userId]);
        
        // Get order items for each order
        for (let order of orders) {
            const [items] = await db.query(`
                SELECT oi.*, mi.title, mi.image_url
                FROM order_items oi
                JOIN menu_items mi ON oi.menu_item_id = mi.id
                WHERE oi.order_id = ?
            `, [order.id]);
            order.items = items;
        }
        
        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get order by ID
router.get('/:id', async (req, res) => {
    try {
        const [orders] = await db.query(`
            SELECT o.*, u.username, r.name as restaurant_name
            FROM orders o
            JOIN users u ON o.user_id = u.id
            JOIN restaurants r ON o.restaurant_id = r.id
            WHERE o.id = ?
        `, [req.params.id]);
        
        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        
        const order = orders[0];
        
        // Get order items
        const [items] = await db.query(`
            SELECT oi.*, mi.title, mi.image_url
            FROM order_items oi
            JOIN menu_items mi ON oi.menu_item_id = mi.id
            WHERE oi.order_id = ?
        `, [order.id]);
        
        order.items = items;
        
        res.json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Create new order
router.post('/', async (req, res) => {
    try {
        const { user_id, menu_item_id, quantity } = req.body;
        if (!user_id || !menu_item_id || !quantity) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }
        // Get menu item info
        const [menuRows] = await db.query('SELECT price, restaurant_id FROM menu_items WHERE id = ?', [menu_item_id]);
        if (menuRows.length === 0) {
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }
        const menuItem = menuRows[0];
        const price = menuItem.price;
        const restaurant_id = menuItem.restaurant_id;
        const total_amount = price * quantity;
        // Create order
        const [orderResult] = await db.query(
            'INSERT INTO orders (user_id, restaurant_id, total_amount) VALUES (?, ?, ?)',
            [user_id, restaurant_id, total_amount]
        );
        const order_id = orderResult.insertId;
        // Create order item
        await db.query(
            'INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES (?, ?, ?, ?)',
            [order_id, menu_item_id, quantity, price]
        );
        res.status(201).json({ success: true, message: 'Order placed', order_id });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update order status
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const orderId = req.params.id;
        
        const [result] = await db.query(
            'UPDATE orders SET status = ? WHERE id = ?',
            [status, orderId]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        
        res.json({ success: true, message: 'Order status updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete order
router.delete('/:id', async (req, res) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        
        // Delete order items first (due to foreign key constraint)
        await connection.query('DELETE FROM order_items WHERE order_id = ?', [req.params.id]);
        
        // Delete order
        const [result] = await connection.query('DELETE FROM orders WHERE id = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            await connection.rollback();
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        
        await connection.commit();
        res.json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ success: false, message: error.message });
    } finally {
        connection.release();
    }
});

module.exports = router; 