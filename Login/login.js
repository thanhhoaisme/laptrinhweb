
// Asynchronous function to handle login attempts (both admin and regular user)
async function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;   


    try {
        // Attempt admin login first
        const adminResponse = await fetch('http://localhost:8989/loginadmin', {
            method: 'post',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ username, password }) 
        });

        if (adminResponse.ok) {
            // You might want to use the response data here, e.g., to store user information
            window.location.href = '/admin/admin.html';
            alert("Đăng nhập thành công với tư cách admin"); 
            return; 
        } 

        // If admin login fails, attempt regular user login
        const userResponse = await fetch('http://localhost:8989/login', {
            method: 'post',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({   
 username, password })
        });

        if (userResponse.ok) {
            // You might want to use the response data here, e.g., to store user information
            window.location.href = '/Loginsuccess/Homepagesuccess.html';
            alert("Đăng nhập thành công");
        } else {
            try {
                const errorData = await userResponse.json(); // Try to get error details from the server
                alert(`Đăng nhập không thành công: ${errorData.message || 'Lỗi không xác định'}`);
            } catch (error) {
                console.error("Error parsing login response:", error);
                alert("Đăng nhập không thành công, vui lòng kiểm tra lại thông tin đăng nhập của bạn.");
            }
        } 

    } catch (error) {
        console.error("Error during login:", error);
        alert("Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau.");
    }
}