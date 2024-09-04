function getBookImage(bookId) {
    fetch(`/images/${bookId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        // Kiểm tra Content-Type của phản hồi để biết backend trả về gì
        const contentType = response.headers.get('Content-Type');
  
        if (contentType && contentType.startsWith('image/')) { 
          // Backend trả về ảnh dưới dạng binary data
          return response.blob();
        } else {
          // Backend trả về đường dẫn ảnh (hoặc dữ liệu khác)
          return response.text();
        }
      })
      .then(data => {
        const bookImage = document.getElementById('bookImage');
  
        if (data instanceof Blob) {
          // Nếu là blob, tạo Object URL và gán cho src
          const imageUrl = URL.createObjectURL(data);
          bookImage.src = imageUrl;
        } else {
          // Nếu là đường dẫn, gán trực tiếp cho src
          bookImage.src = data;
        }
      })
      .catch(error => {
        console.error('Error fetching image:', error);
        // Xử lý lỗi, ví dụ: 
        bookImage.src = 'error.jpg'; // Hiển thị ảnh lỗi
        // hoặc
        bookImage.alt = 'Không thể tải ảnh'; 
      });
  }