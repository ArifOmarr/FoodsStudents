const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const mysql = require('mysql2');
const PORT = 3000;

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // your MySQL username
  password: '', // your MySQL password
  database: 'foodstudents'
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL');
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from pages, components, js, css, assets
app.use('/pages', express.static(path.join(__dirname, 'pages')));
app.use('/components', express.static(path.join(__dirname, 'components')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Import routes
const userRoutes = require('./routes/user.routes');
const restaurantRoutes = require('./routes/restaurant.routes');
const menuItemRoutes = require('./routes/menuItem.routes');
const orderRoutes = require('./routes/order.routes');
const voucherRoutes = require('./routes/voucher.routes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menu-items', menuItemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/vouchers', voucherRoutes);

// Registration route
app.post('/api/register', (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(sql, [username, email, password, role || 'student'], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Registration failed' });
    }
    res.json({
      user: {
        id: result.insertId,
        username,
        email,
        role: role || 'student'
      },
      message: 'Registration successful'
    });
  });
});

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing email or password' });
  }
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Login failed' });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const user = results[0];
    res.json({ 
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'menu.html'));
});

// Test route
app.get('/test', (req, res) => {
  console.log('Test endpoint hit');
  res.send('Test OK');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Network access: http://10.203.83.2:${PORT}`);
});

