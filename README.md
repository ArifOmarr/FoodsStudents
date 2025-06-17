# FoodStudents - Food Delivery Web Application

A web-based food delivery application built with Node.js, Express, and MySQL.

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- MySQL Server
- Git (for cloning the repository)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone [your-repository-url]
cd FoodStudents
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup
1. Open MySQL Server
2. Create a new database by running the schema file:
   ```bash
   mysql -u root -p < database/schema.sql
   ```
   Note: Replace 'root' with your MySQL username if different

### 4. Configure Database Connection
1. Open `config/db.config.js`
2. Update the database credentials if needed:
   ```javascript
   module.exports = {
     HOST: "localhost",
     USER: "root",     // Your MySQL username
     PASSWORD: "",     // Your MySQL password
     DB: "foodstudents"
   };
   ```

### 5. Start the Application
```bash
npm start
```
The application will be available at `http://localhost:3000`

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

## Troubleshooting
1. If you get a database connection error:
   - Check if MySQL server is running
   - Verify database credentials in db.config.js
   - Ensure the database 'foodstudents' exists

2. If the server fails to start:
   - Check if port 3000 is available
   - Verify all dependencies are installed
   - Check console for error messages

## Support
For any issues or questions, please contact [your-contact-information] 