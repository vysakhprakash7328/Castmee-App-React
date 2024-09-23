// logout.js

// Import any necessary modules or dependencies here

const logout = () => {
    // Clear user authentication data (example: clear localStorage items)
    localStorage.removeItem('user_details');
  
    // Redirect the user to the login page (example: navigate to '/login')
    window.location.href = '/home'; // Change '/login' to your actual login page URL
  };
  
  export default logout;
  