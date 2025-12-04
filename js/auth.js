// Authentication utilities
const AUTH_KEY = 'qlsv_current_user';

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem(AUTH_KEY) !== null;
}

// Get current user
function getCurrentUser() {
    const userJson = localStorage.getItem(AUTH_KEY);
    return userJson ? JSON.parse(userJson) : null;
}

// Set current user
function setCurrentUser(user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

// Logout user
function logout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = '../index.html';
}

// Check authentication and redirect if not logged in
//function requireAuth() {
   // if (!isLoggedIn()) {
       // window.location.href = '../index.html';
       // return false;
  //  }
    //return true;
//}

// Check if user has specific role
function hasRole(role) {
    const user = getCurrentUser();
    return user && user.role === role;
}

// Initialize demo accounts if not exists
function initializeDemoAccounts() {
    const USERS_KEY = 'qlsv_users';
    const existingUsers = localStorage.getItem(USERS_KEY);
    
    if (!existingUsers) {
        const demoUsers = [
            {
                id: 1,
                username: 'admin',
                password: 'admin123',
                fullname: 'Quản trị viên',
                email: 'admin@qlsv.edu.vn',
                phone: '0123456789',
                role: 'admin',
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                username: 'student',
                password: 'student123',
                fullname: 'Nguyễn Văn A',
                email: 'student@qlsv.edu.vn',
                phone: '0987654321',
                role: 'student',
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers));
    }
}

// Login function
function loginUser(username, password) {
    const USERS_KEY = 'qlsv_users';
    const usersJson = localStorage.getItem(USERS_KEY);
    
    if (!usersJson) {
        return { success: false, message: 'Không tìm thấy dữ liệu người dùng' };
    }
    
    const users = JSON.parse(usersJson);
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        const { password, ...userWithoutPassword } = user;
        setCurrentUser(userWithoutPassword);
        return { success: true, user: userWithoutPassword };
    }
    
    return { success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng' };
}

// Register function
function registerUser(userData) {
    const USERS_KEY = 'qlsv_users';
    const usersJson = localStorage.getItem(USERS_KEY);
    const users = usersJson ? JSON.parse(usersJson) : [];
    
    // Check if username already exists
    if (users.some(u => u.username === userData.username)) {
        return { success: false, message: 'Tên đăng nhập đã tồn tại' };
    }
    
    // Check if email already exists
    if (users.some(u => u.email === userData.email)) {
        return { success: false, message: 'Email đã được sử dụng' };
    }
    
    // Create new user
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        ...userData,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    return { success: true, user: newUser };
}

// Initialize demo accounts on load
initializeDemoAccounts();

