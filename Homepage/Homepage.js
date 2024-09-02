let isRegistered = false;
let isLoggedIn = false;

function openModal() {
    document.getElementById('modal').style.display = 'flex'; // Sử dụng flex để căn giữa
    showForm(isLoggedIn ? 'login' : 'register'); // Hiển thị form đăng nhập nếu đã đăng nhập
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function showForm(formType) {
    document.getElementById('login-form').style.display = formType === 'login' ? 'block' : 'none';
    document.getElementById('register-form').style.display = formType === 'register' ? 'block' : 'none';
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`.tab-button[onclick="showForm('${formType}')"]`).classList.add('active');
}

function handleLogin() {
    if (!isRegistered) {
        document.getElementById('login-message').textContent = 'Bạn phải đăng ký trước!';
        return;
    }

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email && password) {
        document.getElementById('login-message').textContent = 'Đăng nhập thành công';
        isLoggedIn = true;
        updateHeaderButtons();
        closeModal();
        window.location.href = '/Homepage/Homepage.html';
    } else {
        document.getElementById('login-message').textContent = 'Vui lòng nhập đầy đủ thông tin';
    }
}

function handleRegister() {
    const email = document.getElementById('register-email').value;
    const phone = document.getElementById('register-phone').value;
    const password = document.getElementById('register-password').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]+$/;

    if (!emailRegex.test(email)) {
        document.getElementById('register-message').textContent = 'Email không hợp lệ';
        return;
    }

    if (!phoneRegex.test(phone)) {
        document.getElementById('register-message').textContent = 'Số điện thoại chỉ được chứa số';
        return;
    }

    if (email && phone && password) {
        isRegistered = true;
        document.getElementById('register-message').textContent = 'Đăng ký thành công';
        document.getElementById('login-message').textContent = ''; // Xóa thông báo đăng nhập
    } else {
        document.getElementById('register-message').textContent = 'Vui lòng nhập đầy đủ thông tin';
    }
}

function updateHeaderButtons() {
    const registerBtn = document.getElementById('register-btn');
    const loginBtn = document.getElementById('login-btn');

    if (isLoggedIn) {
        registerBtn.textContent = 'Giỏ hàng';
        loginBtn.textContent = 'Đăng xuất';
        loginBtn.onclick = function() {
            isLoggedIn = false;
            updateHeaderButtons();
        };
    } else {
        registerBtn.textContent = 'Đăng ký';
        loginBtn.textContent = 'Đăng nhập';
        loginBtn.onclick = openModal;
    }
}