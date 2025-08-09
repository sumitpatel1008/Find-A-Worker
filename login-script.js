// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Get the login form from the HTML
    const loginForm = document.getElementById('loginForm');

    // Add an event listener for when the form is submitted
    loginForm.addEventListener('submit', async (event) => {
        // Prevent the form from reloading the page
        event.preventDefault();

        // Get the data from the form fields
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // --- Send Data to the Server ---
        try {
            // Use the fetch API to send a POST request to your server's /login endpoint
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            // Get the response from the server
            const data = await response.json();

            if (response.ok) {
                // If login is successful, redirect to the main home page
                alert('Login successful!');
                window.location.href = 'index.html';
            } else {
                // If there was an error, show the message from the server
                alert('Error: ' + data.message);
            }
        } catch (error) {
            console.error('There was an error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
