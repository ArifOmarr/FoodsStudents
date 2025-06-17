// Cart service
const CartService = {
  // Get cart items
  getCartItems() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  },

  // Add item to cart
  addToCart(item, quantity = 1) {
    const cart = this.getCartItems();
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        ...item,
        quantity,
        addedAt: new Date().toISOString()
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateCartCount();
    return cart;
  },

  // Remove item from cart
  removeFromCart(itemId) {
    const cart = this.getCartItems();
    const updatedCart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.updateCartCount();
    return updatedCart;
  },

  // Update item quantity
  updateQuantity(itemId, quantity) {
    const cart = this.getCartItems();
    const item = cart.find(item => item.id === itemId);

    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(itemId);
      }
      item.quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      this.updateCartCount();
    }

    return cart;
  },

  // Clear cart
  clearCart() {
    localStorage.removeItem('cart');
    this.updateCartCount();
    return [];
  },

  // Get cart total
  getCartTotal() {
    const cart = this.getCartItems();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  // Get cart count
  getCartCount() {
    const cart = this.getCartItems();
    return cart.reduce((count, item) => count + item.quantity, 0);
  },

  // Update cart count in UI
  updateCartCount() {
    const count = this.getCartCount();
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
      element.textContent = count;
      element.classList.toggle('hidden', count === 0);
    });
  },

  // Apply voucher to cart
  applyVoucher(voucher) {
    const cart = this.getCartItems();
    const total = this.getCartTotal();
    let discount = 0;

    switch (voucher.code) {
      case 'SAVE10':
        discount = total * 0.1;
        break;
      case 'FREEDEL':
        // Free delivery logic would go here
        break;
      case 'FIVEOFF25':
        if (total >= 25) {
          discount = 5;
        }
        break;
      case 'B1G1':
        // Buy 1 Get 1 logic would go here
        break;
      case 'STUDENT15':
        discount = total * 0.15;
        break;
      default:
        break;
    }

    return {
      originalTotal: total,
      discount,
      finalTotal: total - discount
    };
  },

  // Save cart for later
  saveCart() {
    const cart = this.getCartItems();
    localStorage.setItem('savedCart', JSON.stringify(cart));
  },

  // Load saved cart
  loadSavedCart() {
    const savedCart = localStorage.getItem('savedCart');
    if (savedCart) {
      localStorage.setItem('cart', savedCart);
      localStorage.removeItem('savedCart');
      this.updateCartCount();
      return JSON.parse(savedCart);
    }
    return null;
  }
};

export default CartService; 