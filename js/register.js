document.getElementById('register-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const data = {
    username: form.name.value,
    email: form.email.value,
    password: form.password.value,
    role: 'student'
  };
  
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    
    if (res.ok) {
      const messageDiv = document.getElementById('message');
      messageDiv.textContent = result.message;
      messageDiv.className = 'message success';
      messageDiv.style.display = 'block';
      // Store user in localStorage for auto-login
      localStorage.setItem('user', JSON.stringify(result.user));
      // Optionally, set loggedIn flag
      localStorage.setItem('loggedIn', 'true');
      // Show popup message
      alert('Registration completed successfully! Redirecting to your profile...');
      // Redirect to profile page after successful registration
      setTimeout(() => {
        window.location.href = '/pages/profile.html';
      }, 2000);
    } else {
      const messageDiv = document.getElementById('message');
      messageDiv.textContent = result.message;
      messageDiv.className = 'message error';
      messageDiv.style.display = 'block';
    }
  } catch (error) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = 'Registration failed. Please try again.';
    messageDiv.className = 'message error';
    messageDiv.style.display = 'block';
  }
}); 