const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', // Update this with your MySQL password
  database: 'foodstudents'
};

async function populateDatabase() {
  let connection;
  
  try {
    console.log('🔌 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database successfully!\n');

    // Read the sample data SQL file
    const sampleDataPath = path.join(__dirname, 'database', 'sample_data.sql');
    const sampleData = fs.readFileSync(sampleDataPath, 'utf8');

    console.log('📝 Loading sample data...');
    
    // Split the SQL file into individual statements
    const statements = sampleData
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          await connection.execute(statement);
          console.log(`✅ Executed statement ${i + 1}/${statements.length}`);
        } catch (error) {
          console.log(`⚠️  Statement ${i + 1} skipped (might already exist): ${error.message}`);
        }
      }
    }

    console.log('\n🎉 Database populated successfully!');
    console.log('\n📊 Sample data added:');
    console.log('- 6 users (students, restaurant owners, admin)');
    console.log('- 5 restaurants (Pizza Palace, Burger House, Sushi Express, Taco Fiesta, Curry Corner)');
    console.log('- 25 menu items across all restaurants');
    console.log('- 5 sample orders');
    console.log('- 11 order items');
    
    console.log('\n🚀 You can now:');
    console.log('1. Start the server: npm start');
    console.log('2. Visit: http://localhost:3000');
    console.log('3. Login with: john@student.com / password123');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure MySQL is running');
    console.log('2. Check if database "foodstudents" exists');
    console.log('3. Verify username and password in this script');
    console.log('4. Run: mysql -u root -p < database/schema.sql');
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the script
populateDatabase(); 