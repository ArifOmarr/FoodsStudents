// Authentication service
const AuthService = {
  // Check if user is logged in
  isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true';
  },

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Login user
  login(email, password) {
    // In a real app, this would make an API call
    // For demo, we'll just simulate a successful login
    return new Promise((resolve, reject) => {
      // Simulate API delay
      setTimeout(() => {
        if (email && password) {
          const user = {
            id: 1,
            email,
            name: 'Alex',
            role: 'student'
          };
          
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  // Logout user
  logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    window.location.href = '/pages/login.html';
  },

  // Register new user
  register(userData) {
    // In a real app, this would make an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.email && userData.password) {
          const user = {
            id: Date.now(),
            ...userData,
            role: 'student'
          };
          
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Invalid registration data'));
        }
      }, 1000);
    });
  },

  // Update user profile
  updateProfile(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const currentUser = this.getCurrentUser();
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            ...userData
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          resolve(updatedUser);
        } else {
          reject(new Error('No user logged in'));
        }
      }, 1000);
    });
  },

  // Check if user has a specific role
  hasRole(role) {
    const user = this.getCurrentUser();
    return user && user.role === role;
  },

  // Get user's vouchers
  getUserVouchers() {
    const vouchers = localStorage.getItem('vouchers');
    return vouchers ? JSON.parse(vouchers) : [];
  },

  // Add voucher to user
  addVoucher(voucher) {
    const vouchers = this.getUserVouchers();
    vouchers.push({
      ...voucher,
      claimedAt: new Date().toISOString()
    });
    localStorage.setItem('vouchers', JSON.stringify(vouchers));
  },

  // Remove voucher from user
  removeVoucher(voucherId) {
    const vouchers = this.getUserVouchers();
    const updatedVouchers = vouchers.filter(v => v.id !== voucherId);
    localStorage.setItem('vouchers', JSON.stringify(updatedVouchers));
  }
};

export default AuthService; 