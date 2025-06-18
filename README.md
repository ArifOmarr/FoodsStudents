# FoodStudents - Food Delivery Web Application

A web-based food delivery application built with Node.js, Express, and MySQL.

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- MySQL Server (v8.0 or higher)
- Git (for cloning the repository)

## Detailed Setup Guide

### 1. Clone the Repository
```bash
git clone https://github.com/ArifOmarr/FoodsStudents.git
cd FoodsStudents
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup

#### Step 1: Install MySQL Server
1. Download MySQL Server from [MySQL Official Website](https://dev.mysql.com/downloads/mysql/)
2. During installation:
   - Choose "Developer Default" setup type
   - Set root password (remember this password!)
   - Complete the installation

#### Step 2: Create Database
1. Open MySQL Command Line Client or MySQL Workbench
2. Log in with your root password
3. Run the schema file:
   ```bash
   # If using MySQL Command Line:
   mysql -u root -p < database/schema.sql
   
   # If using MySQL Workbench:
   # Open database/schema.sql and execute the script
   ```

#### Step 3: Configure Database Connection
1. Open `config/db.config.js`
2. Update the credentials:
   ```javascript
   module.exports = {
     HOST: "localhost",
     USER: "root",     // Your MySQL username (usually "root")
     PASSWORD: "",     // Your MySQL root password
     DB: "foodstudents"
   };
   ```

### 4. Start the Application
```bash
npm start
```
The application will be available at `http://localhost:3000`

## Initial Data Setup

After setting up the database, you'll need to add some initial data:

1. Register a new user account at `http://localhost:3000/register.html`
2. Log in with your credentials at `http://localhost:3000/login.html`

## Troubleshooting Common Issues

### Database Connection Issues
1. If you get "Access denied" error:
   - Verify your MySQL username and password in `config/db.config.js`
   - Make sure MySQL service is running
   - Try resetting MySQL root password if needed

2. If database doesn't exist:
   - Run the schema file again
   - Check MySQL error logs for any issues

3. If tables are missing:
   - Check if schema.sql executed successfully
   - Verify database name is correct

### Server Issues
1. If port 3000 is in use:
   - Change port in server.js
   - Or kill the process using port 3000

2. If npm install fails:
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules folder and package-lock.json
   - Run `npm install` again

## Project Structure
```
FoodStudents/
├── config/             # Configuration files
├── database/           # Database schema and migrations
├── pages/             # Frontend pages
├── public/            # Static assets
├── routes/            # API routes
├── server.js          # Main application file
└── package.json       # Project dependencies
```

## Features
- User authentication (login/register)
- Restaurant browsing
- Menu viewing
- Order placement
- Order history
- Profile management

## API Endpoints
- POST /api/auth/register - Register new user
- POST /api/auth/login - User login
- GET /api/restaurants - Get all restaurants
- GET /api/restaurants/:id - Get restaurant details
- GET /api/menu/:restaurantId - Get restaurant menu
- POST /api/orders - Place new order
- GET /api/orders/user/:userId - Get user orders

## Support
For any issues or questions, please contact the repository owner. 