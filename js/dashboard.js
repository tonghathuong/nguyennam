// Dashboard page script

// Check authentication
requireAuth();

// Load dashboard statistics
function loadDashboardStats() {
    const students = getStudents();
    const subjects = getSubjects();
    const schedules = getSchedules();
    const notifications = getNotifications();
    
    document.getElementById('totalStudents').textContent = students.length;
    document.getElementById('totalClasses').textContent = [...new Set(students.map(s => s.class))].length;
    document.getElementById('totalSubjects').textContent = subjects.length;
    document.getElementById('totalNotifications').textContent = notifications.filter(n => !n.isRead).length;
}

// Load recent students
function loadRecentStudents() {
    const students = getStudents();
    const recentStudents = students.slice(-5).reverse();
    
    const container = document.getElementById('recentStudents');
    
    if (recentStudents.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-4">Chưa có sinh viên nào</p>';
        return;
    }
    
    container.innerHTML = recentStudents.map(student => `
        <div class="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <span class="text-indigo-600 font-semibold">${student.fullname.charAt(0)}</span>
            </div>
            <div class="flex-1">
                <p class="font-semibold text-gray-800">${student.fullname}</p>
                <p class="text-sm text-gray-500">${student.studentCode} - ${student.class}</p>
            </div>
            <span class="badge badge-${student.status === 'active' ? 'success' : 'warning'}">
                ${student.status === 'active' ? 'Đang học' : 'Tạm nghỉ'}
            </span>
        </div>
    `).join('');
}

// Load recent notifications
function loadRecentNotifications() {
    const notifications = getNotifications();
    const recentNotifications = notifications.slice(-5).reverse();
    
    const container = document.getElementById('recentNotifications');
    
    if (recentNotifications.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-4">Chưa có thông báo nào</p>';
        return;
    }
    
    const priorityColors = {
        high: 'text-red-600',
        medium: 'text-yellow-600',
        low: 'text-gray-600'
    };
    
    container.innerHTML = recentNotifications.map(notification => `
        <div class="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition ${!notification.isRead ? 'bg-blue-50' : ''}">
            <div class="flex items-start justify-between mb-1">
                <h4 class="font-semibold text-gray-800 text-sm">${notification.title}</h4>
                <span class="${priorityColors[notification.priority]}">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                    </svg>
                </span>
            </div>
            <p class="text-xs text-gray-600 mb-2">${notification.content.substring(0, 80)}${notification.content.length > 80 ? '...' : ''}</p>
            <p class="text-xs text-gray-400">${formatDateTime(notification.createdAt)}</p>
        </div>
    `).join('');
}

// Initialize dashboard
function initDashboard() {
    loadDashboardStats();
    loadRecentStudents();
    loadRecentNotifications();
}

// Call initialization
initDashboard();
