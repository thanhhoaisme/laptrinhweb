// register.js

// Get references to the form and button
const registerForm = document.getElementById('register-form');
const registerButton = document.getElementById('register-button');
const messageContainer = document.getElementById('message-container');

async function registerUser() {
    // Prevent default form submission
    event.preventDefault();

    // Gather data from the form
    const customerName = document.getElementById('customer_name').value;
    const phoneNo = document.getElementById('customer_phone_no').value;
    const email = document.getElementById('customer_email').value;
    const address = document.getElementById('customer_address').value;
    const password = document.getElementById('customer_password').value;

    // Basic client-side validation (you should enhance this)
    if (!customerName || !phoneNo || !email || !address || !password) {
        alert('Please fill in all required fields.');
        return;
    }

    try {
        const response = await fetch('http://localhost:8989/register', { // Adjust the URL if needed
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                Customer_Name: customerName,
                Phone_No: phoneNo,
                Email: email,
                Address_: address,
                Pass_Word: password // NOT RECOMMENDED for production - store hashed passwords
            })
        });

        if (response.ok) {
            const data = await response.json();
            window.location.href = '/Homepage/Homepage.html';
            alert("Đăng nhập thành công");
            // Handle success (e.g., redirect to login, display success message)
        } else {
            const errorData = await response.json();
            console.error('Registration failed:', errorData);
            alert("Đăng ký thất bại");
            // Handle error (e.g., display error message to the user)
        }
    } catch (error) {
        console.error('Network error:', error);
        // Handle network errors
    }
}

// Attach the registerUser function to the button's click event
registerButton.addEventListener('click', registerUser);