-- Sample data for FoodStudents database
USE foodstudents;

-- Insert sample users
INSERT INTO users (username, email, password, role) VALUES
('john_doe', 'john@student.com', 'password123', 'student'),
('jane_smith', 'jane@student.com', 'password123', 'student'),
('mike_wilson', 'mike@student.com', 'password123', 'student'),
('sarah_restaurant', 'sarah@restaurant.com', 'password123', 'restaurant_owner'),
('tom_pizzeria', 'tom@pizza.com', 'password123', 'restaurant_owner'),
('admin_user', 'admin@foodstudents.com', 'password123', 'admin');

-- Insert sample restaurants
INSERT INTO restaurants (name, cuisine, rating, delivery_time, image_url, owner_id) VALUES
('Pizza Palace', 'Italian', 4.5, '30-45 min', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', 4),
('Burger House', 'American', 4.2, '25-35 min', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400', 5),
('Sushi Express', 'Japanese', 4.7, '40-55 min', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400', 4),
('Taco Fiesta', 'Mexican', 4.0, '20-30 min', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400', 5),
('Curry Corner', 'Indian', 4.3, '35-45 min', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', 4);

-- Insert sample menu items for Pizza Palace
INSERT INTO menu_items (restaurant_id, title, description, price, category, image_url) VALUES
(1, 'Margherita Pizza', 'Classic tomato sauce with mozzarella cheese', 12.99, 'Pizza', 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300'),
(1, 'Pepperoni Pizza', 'Spicy pepperoni with melted cheese', 14.99, 'Pizza', 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300'),
(1, 'Hawaiian Pizza', 'Ham and pineapple with cheese', 13.99, 'Pizza', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300'),
(1, 'Garlic Bread', 'Fresh baked garlic bread with herbs', 4.99, 'Sides', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300'),
(1, 'Caesar Salad', 'Fresh lettuce with caesar dressing', 8.99, 'Salads', 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300');

-- Insert sample menu items for Burger House
INSERT INTO menu_items (restaurant_id, title, description, price, category, image_url) VALUES
(2, 'Classic Burger', 'Beef patty with lettuce, tomato, and cheese', 9.99, 'Burgers', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300'),
(2, 'Cheese Burger', 'Beef patty with extra cheese', 10.99, 'Burgers', 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300'),
(2, 'Chicken Burger', 'Grilled chicken with fresh vegetables', 11.99, 'Burgers', 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=300'),
(2, 'French Fries', 'Crispy golden fries', 4.99, 'Sides', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300'),
(2, 'Onion Rings', 'Crispy battered onion rings', 5.99, 'Sides', 'https://images.unsplash.com/photo-1585109649139-e1a002ea9f63?w=300');

-- Insert sample menu items for Sushi Express
INSERT INTO menu_items (restaurant_id, title, description, price, category, image_url) VALUES
(3, 'California Roll', 'Crab, avocado, and cucumber', 8.99, 'Sushi', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300'),
(3, 'Salmon Nigiri', 'Fresh salmon over rice', 6.99, 'Sushi', 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=300'),
(3, 'Tuna Roll', 'Fresh tuna with rice and nori', 9.99, 'Sushi', 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=300'),
(3, 'Miso Soup', 'Traditional Japanese miso soup', 3.99, 'Soups', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300'),
(3, 'Edamame', 'Steamed soybeans with salt', 4.99, 'Appetizers', 'https://images.unsplash.com/photo-1584270357649-c26e0cd5d4a8?w=300');

-- Insert sample menu items for Taco Fiesta
INSERT INTO menu_items (restaurant_id, title, description, price, category, image_url) VALUES
(4, 'Beef Taco', 'Seasoned beef with lettuce and cheese', 3.99, 'Tacos', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300'),
(4, 'Chicken Taco', 'Grilled chicken with salsa', 3.99, 'Tacos', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300'),
(4, 'Fish Taco', 'Fresh fish with cabbage slaw', 4.99, 'Tacos', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300'),
(4, 'Guacamole', 'Fresh avocado dip', 5.99, 'Sides', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300'),
(4, 'Mexican Rice', 'Traditional Mexican rice', 4.99, 'Sides', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300');

-- Insert sample menu items for Curry Corner
INSERT INTO menu_items (restaurant_id, title, description, price, category, image_url) VALUES
(5, 'Butter Chicken', 'Creamy tomato-based curry with chicken', 13.99, 'Curries', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300'),
(5, 'Chicken Tikka Masala', 'Spicy curry with grilled chicken', 14.99, 'Curries', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300'),
(5, 'Vegetable Curry', 'Mixed vegetables in aromatic spices', 11.99, 'Curries', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300'),
(5, 'Naan Bread', 'Fresh baked Indian bread', 2.99, 'Breads', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300'),
(5, 'Basmati Rice', 'Fragrant long-grain rice', 3.99, 'Sides', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300');

-- Insert sample orders
INSERT INTO orders (user_id, restaurant_id, total_amount, status) VALUES
(1, 1, 25.97, 'delivered'),
(2, 2, 19.98, 'ready'),
(3, 3, 32.95, 'preparing'),
(1, 4, 15.96, 'confirmed'),
(2, 5, 28.97, 'pending');

-- Insert sample order items
INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES
(1, 1, 1, 12.99), -- Margherita Pizza
(1, 4, 1, 4.99),  -- Garlic Bread
(1, 5, 1, 7.99),  -- Caesar Salad
(2, 6, 2, 9.99),  -- 2x Classic Burger
(3, 11, 2, 8.99), -- 2x California Roll
(3, 14, 1, 3.99), -- Miso Soup
(3, 15, 2, 4.99), -- 2x Edamame
(4, 16, 4, 3.99), -- 4x Beef Taco
(5, 21, 1, 13.99), -- Butter Chicken
(5, 24, 1, 2.99),  -- Naan Bread
(5, 25, 1, 3.99);  -- Basmati Rice

-- Update restaurant ratings based on orders
UPDATE restaurants SET rating = 4.5 WHERE id = 1;
UPDATE restaurants SET rating = 4.2 WHERE id = 2;
UPDATE restaurants SET rating = 4.7 WHERE id = 3;
UPDATE restaurants SET rating = 4.0 WHERE id = 4;
UPDATE restaurants SET rating = 4.3 WHERE id = 5; 