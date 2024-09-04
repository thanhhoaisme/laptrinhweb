// Xử lý sự kiện khi nhấp vào liên kết "Tài khoản khách hàng"
const customerLink = document.querySelector('a[href="#"]');
const tableContainer = document.getElementById('customer-table');

customerLink.addEventListener('click', (event) => {
    event.preventDefault();

    // Dữ liệu khách hàng mẫu (thay thế bằng dữ liệu thật từ cơ sở dữ liệu hoặc API)
    const customerData = [
        { name: 'Nguyễn Văn A', email: 'a@gmail.com', phone: '0123456789', address: 'Hà Nội' },
        { name: 'Trần Thị B', email: 'b@gmail.com', phone: '0987654321', address: 'Hồ Chí Minh' },
        // ... thêm dữ liệu khách hàng khác
    ];

    // Tạo bảng HTML (chỉ bao gồm các cột yêu cầu)
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Họ và tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
            </tr>
        </thead>
        <tbody>
            ${customerData.map(customer => `
                <tr>
                    <td>${customer.name}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone}</td>
                    <td>${customer.address}</td>
                </tr>
            `).join('')}
        </tbody>
    `;

    // Hiển thị bảng
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
});

// Xử lý sự kiện khi nhấp vào nút "Đăng xuất"
const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', () => {
    // Thực hiện các xử lý cần thiết trước khi đăng xuất (ví dụ: xóa thông tin đăng nhập khỏi localStorage)

    // Chuyển hướng đến trang login.html
    window.location.href = 'login.html';
});