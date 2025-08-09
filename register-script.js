// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Get the registration form from the HTML
    const registerForm = document.getElementById('registerForm');

    // Add an event listener for when the form is submitted
    registerForm.addEventListener('submit', async (event) => {
        // Prevent the form from reloading the page
        event.preventDefault();

        // Get the data from the form fields
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Find out which radio button is selected (customer or worker)
        const userType = document.querySelector('input[name="accountType"]:checked').value;

        // --- Send Data to the Server ---
        try {
            // Use the fetch API to send a POST request to your server's /register endpoint
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    full_name: fullName,
                    email: email,
                    password: password,
                    user_type: userType,
                }),
            });

            // Get the response from the server
            const data = await response.json();

            if (response.ok) {
                // If registration is successful, redirect to the login page
                alert('Registration successful! Please log in.');
                window.location.href = 'login.html';
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
