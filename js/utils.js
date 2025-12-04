// Utility functions

// Show toast notification
// Show toast notification (uses SweetAlert2 if available)
function showToast(message, type = 'info') {
    if (window.Swal && Swal.fire) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#3b82f6',
            color: '#fff'
        });

        Toast.fire({
            icon: type === 'success' ? 'success' : type === 'error' ? 'error' : type === 'warning' ? 'warning' : 'info',
            title: message
        });
        return;
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (document.body.contains(toast)) document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Format date to Vietnamese format
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Format datetime to Vietnamese format
function formatDateTime(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes} ${day}/${month}/${year}`;
}

// Generate random ID
function generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
}

// Confirm dialog
function confirmDialog(message) {
    return confirm(message);
}

// Get role display name
function getRoleDisplayName(role) {
    const roles = {
        'admin': 'Quản trị viên',
        'teacher': 'Giảng viên',
        'student': 'Sinh viên'
    };
    return roles[role] || role;
}

// Validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone number (Vietnamese)
function isValidPhone(phone) {
    const re = /^(0|\+84)[0-9]{9}$/;
    return re.test(phone);
}

// Calculate GPA
function calculateGPA(grades) {
    if (!grades || grades.length === 0) return 0;
    const total = grades.reduce((sum, grade) => sum + parseFloat(grade.score || 0), 0);
    return (total / grades.length).toFixed(2);
}

// Get grade classification
function getGradeClassification(gpa) {
    if (gpa >= 9.0) return { text: 'Xuất sắc', class: 'badge-success' };
    if (gpa >= 8.0) return { text: 'Giỏi', class: 'badge-success' };
    if (gpa >= 7.0) return { text: 'Khá', class: 'badge-info' };
    if (gpa >= 5.0) return { text: 'Trung bình', class: 'badge-warning' };
    return { text: 'Yếu', class: 'badge-danger' };
}

// Export to CSV
function exportToCSV(data, filename) {
    if (!data || data.length === 0) {
        showToast('Không có dữ liệu để xuất', 'warning');
        return;
    }
    
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n');
    
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Search in array of objects
function searchInArray(array, searchTerm, fields) {
    if (!searchTerm) return array;
    
    const term = searchTerm.toLowerCase();
    return array.filter(item => {
        return fields.some(field => {
            const value = item[field];
            return value && value.toString().toLowerCase().includes(term);
        });
    });
}

// Sort array by field
function sortArray(array, field, direction = 'asc') {
    return [...array].sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];
        
        if (aVal < bVal) return direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return direction === 'asc' ? 1 : -1;
        return 0;
    });
}

// Paginate array
function paginateArray(array, page, pageSize) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
}

// Calculate total pages
function calculateTotalPages(totalItems, pageSize) {
    return Math.ceil(totalItems / pageSize);
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Set active sidebar link
function setActiveSidebarLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Initialize page
function initializePage() {
    // Set active sidebar link
    setActiveSidebarLink();
    
    // Setup logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirmDialog('Bạn có chắc chắn muốn đăng xuất?')) {
                logout();
            }
        });
    }
    
    // Display current user info
    const currentUser = getCurrentUser();
    if (currentUser) {
        const userNameEl = document.getElementById('userName');
        const userRoleEl = document.getElementById('userRole');
        
        if (userNameEl) userNameEl.textContent = currentUser.fullname || currentUser.username;
        if (userRoleEl) userRoleEl.textContent = getRoleDisplayName(currentUser.role);
    }
}

// Call initialization when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}
