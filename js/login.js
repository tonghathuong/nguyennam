// Login page script
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        showToast('Vui lòng nhập đầy đủ thông tin', 'error');
        return;
    }
    
    const result = loginUser(username, password);
    
    if (result.success) {
        showToast('Đăng nhập thành công!', 'success');
        setTimeout(() => {
            window.location.href = 'pages/dashboard.html';
        }, 1000);
    } else {
        showToast(result.message, 'error');
    }
});
