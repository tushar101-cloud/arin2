document.addEventListener('DOMContentLoaded', () => {
  const arContainer = document.getElementById('ar-container');
  const startButton = document.getElementById('start-navigation');
  const cancelButton = document.getElementById('cancel-navigation');
  const markButton = document.getElementById('mark-location');
  const loginForm = document.getElementById('login-form');
  const loginMessage = document.getElementById('login-message');

  let navigationStarted = false;

  // Handle Admin Login
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('https://your-backend-service.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        loginMessage.innerText = 'Login successful!';
        markButton.style.display = 'block'; // Show mark location button
      } else {
        loginMessage.innerText = 'Login failed!';
      }
    } catch (error) {
      console.error('Login error:', error);
      loginMessage.innerText = 'Login error!';
    }
  });

  // Handle Start Navigation
  startButton.addEventListener('click', function () {
    if (!navigationStarted) {
      arContainer.style.display = 'block';
      // Initialize ARCore or any other AR setup
      alert('Navigation started. Camera opened.');
      navigationStarted = true;
    } else {
      alert('Navigation already started!');
    }
  });

  // Handle Cancel Navigation
  cancelButton.addEventListener('click', function () {
    if (navigationStarted) {
      arContainer.style.display = 'none';
      // Stop ARCore or any other AR teardown
      alert('Navigation canceled. Camera closed.');
      navigationStarted = false;
    } else {
      alert('No navigation to cancel.');
    }
  });

  // Handle Mark Location
  markButton.addEventListener('click', async function () {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please login first!');
      return;
    }

    // Simulate marking a location (random position in the AR space)
    const position = { x: Math.random() * 5, y: Math.random() * 5, z: Math.random() * 5 };

    try {
      const response = await fetch('https://your-backend-service.onrender.com/mark-location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ position })
      });

      if (response.ok) {
        alert('Location marked successfully');
      } else {
        alert('Failed to mark location');
      }
    } catch (error) {
      console.error('Error marking location:', error);
      alert('Error marking location');
    }
  });
});
