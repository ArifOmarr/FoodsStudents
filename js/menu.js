// Example menu logic
document.addEventListener('DOMContentLoaded', async function() {
  // Fetch restaurants from backend
  const res = await fetch('/api/restaurants');
  const restaurants = await res.json();

  const container = document.querySelector('.container');
  const restaurantGrid = document.createElement('div');
  restaurantGrid.className = 'restaurant-grid';

  const defaultImage = '/assets/default-restaurant.jpg'; // Use your own default image path

  // DOM elements for menu section
  const restaurantSection = document.getElementById('restaurant-section');
  const menuSection = document.getElementById('menu-section');
  const menuGrid = document.getElementById('menu-grid');
  const restaurantName = document.getElementById('restaurant-name');
  const backButton = document.getElementById('back-button');

  // Helper to render menu items
  async function showMenuForRestaurant(restaurant) {
    restaurantSection.style.display = 'none';
    menuSection.style.display = 'block';
    restaurantName.textContent = restaurant.NAME || 'No Name';
    menuGrid.innerHTML = '<div>Loading menu...</div>';
    // Fetch menu items for this restaurant
    const res = await fetch(`/api/menu-items?restaurant_id=${restaurant.id}`);
    const menuItems = await res.json();
    menuGrid.innerHTML = '';
    if (menuItems.length === 0) {
      menuGrid.innerHTML = '<div class="empty-state">No menu items found.</div>';
      return;
    }
    menuItems.forEach(item => {
      const div = document.createElement('div');
      div.className = 'menu-item';
      div.innerHTML = `
        <img src="${item.image_url || '/assets/default-menu.jpg'}" alt="${item.title}" class="menu-item-image" />
        <div class="menu-item-content">
          <div class="menu-item-header">
            <h4 class="menu-item-title">${item.title}</h4>
            <span class="menu-item-price">$${item.price}</span>
          </div>
          <div class="menu-item-description">${item.description || ''}</div>
          <div class="quantity-controls">
            <button class="qty-btn minus">-</button>
            <input type="number" class="qty-input" value="1" min="1" />
            <button class="qty-btn plus">+</button>
          </div>
          <button class="add-to-cart-btn"><i class="fas fa-cart-plus"></i> Add to Cart</button>
        </div>
      `;
      // Quantity logic
      const qtyInput = div.querySelector('.qty-input');
      div.querySelector('.qty-btn.minus').onclick = () => {
        if (qtyInput.value > 1) qtyInput.value--;
      };
      div.querySelector('.qty-btn.plus').onclick = () => {
        qtyInput.value++;
      };
      // Add to Cart logic
      div.querySelector('.add-to-cart-btn').addEventListener('click', async (e) => {
        e.stopPropagation();
        const quantity = parseInt(qtyInput.value, 10);
        const user = JSON.parse(localStorage.getItem('user'));
        const user_id = user ? user.id : null;
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existing = cart.find(i => i.id === item.id);
        if (existing) {
          existing.quantity += quantity;
        } else {
          cart.push({
            id: item.id,
            name: item.title,
            price: item.price,
            quantity: quantity,
            image: item.image_url || '/assets/default-menu.jpg'
          });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Show cart notification
        const notification = document.getElementById('cart-notification');
        notification.style.opacity = 1;
        setTimeout(() => notification.style.opacity = 0, 2000);
        
        if (res.ok) {
          alert('Order placed!');
        } else {
          alert('Failed to place order.');
        }
      });
      menuGrid.appendChild(div);
    });
  }

  // Render restaurants
  restaurants.forEach(restaurant => {
    const imageUrl = restaurant.image_url && restaurant.image_url !== 'undefined' ? restaurant.image_url : defaultImage;
    const div = document.createElement('div');
    div.className = 'restaurant-card';
    div.innerHTML = `
      <div class="restaurant-image-wrapper">
        <img src="${imageUrl}" alt="${restaurant.NAME || 'Restaurant'}" class="restaurant-image" />
      </div>
      <div class="restaurant-info">
        <h3 class="restaurant-name">${restaurant.NAME || 'No Name'}</h3>
        <div class="restaurant-cuisine">${restaurant.cuisine || ''}</div>
        <div class="restaurant-rating"><b>Rating:</b> ${restaurant.rating || 'N/A'}</div>
        <div class="restaurant-delivery"><b>Delivery Time:</b> ${restaurant.delivery_time || 'N/A'}</div>
      </div>
    `;
    div.addEventListener('click', () => showMenuForRestaurant(restaurant));
    restaurantGrid.appendChild(div);
  });

  container.appendChild(restaurantGrid);

  // Back button logic
  if (backButton) {
    backButton.addEventListener('click', () => {
      menuSection.style.display = 'none';
      restaurantSection.style.display = 'block';
    });
  }
}); 