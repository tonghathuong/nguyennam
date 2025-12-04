// Register page script
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = document.getElementById('role').value;
    
    // Validation
    if (!fullname || !email || !username || !password || !confirmPassword || !role) {
        showToast('Vui lòng nhập đầy đủ thông tin bắt buộc', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showToast('Email không hợp lệ', 'error');
        return;
    }
    
    if (phone && !isValidPhone(phone)) {
        showToast('Số điện thoại không hợp lệ', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Mật khẩu phải có ít nhất 6 ký tự', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('Mật khẩu xác nhận không khớp', 'error');
        return;
    }
    
    // Register user
    const result = registerUser({
        fullname,
        email,
        username,
        phone,
        password,
        role
    });
    
    if (result.success) {
        showToast('Đăng ký thành công! Đang chuyển hướng...', 'success');
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1500);
    } else {
        showToast(result.message, 'error');
    }
});
