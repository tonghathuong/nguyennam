// Students management script

// Check authentication
requireAuth();

// Global variables
let currentPage = 1;
const pageSize = 10;
let allStudents = [];
let filteredStudents = [];
let editingStudentId = null;

// Load students
function loadStudents() {
    allStudents = getStudents();
    filteredStudents = allStudents;
    renderStudentsTable();
}

// Render students table
function renderStudentsTable() {
    const tbody = document.getElementById('studentsTableBody');
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageStudents = filteredStudents.slice(startIndex, endIndex);
    
    if (pageStudents.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="px-6 py-8 text-center text-gray-500">
                    <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                    <p class="text-lg font-medium">Không tìm thấy sinh viên nào</p>
                </td>
            </tr>
        `;
    } else {
        tbody.innerHTML = pageStudents.map((student, index) => {
            const statusClass = student.status === 'active' ? 'badge-success' : 
                               student.status === 'inactive' ? 'badge-warning' : 'badge-info';
            const statusText = student.status === 'active' ? 'Đang học' : 
                              student.status === 'inactive' ? 'Tạm nghỉ' : 'Đã tốt nghiệp';
            
            return `
                <tr class="table-row hover:bg-gray-50 transition">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${startIndex + index + 1}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${student.studentCode}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${student.fullname}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${formatDate(student.dateOfBirth)}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${student.class}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${student.major}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="badge ${statusClass}">${statusText}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button onclick="viewStudent(${student.id})" class="text-blue-600 hover:text-blue-800 transition" title="Xem chi tiết">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                        </button>
                        <button onclick="editStudent(${student.id})" class="text-yellow-600 hover:text-yellow-800 transition" title="Chỉnh sửa">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <button onclick="deleteStudent(${student.id})" class="text-red-600 hover:text-red-800 transition" title="Xóa">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }
    
    updatePagination();
}

// Update pagination
function updatePagination() {
    const totalRecords = filteredStudents.length;
    const totalPages = Math.ceil(totalRecords / pageSize);
    const startIndex = (currentPage - 1) * pageSize + 1;
    const endIndex = Math.min(currentPage * pageSize, totalRecords);
    
    document.getElementById('showingFrom').textContent = totalRecords > 0 ? startIndex : 0;
    document.getElementById('showingTo').textContent = endIndex;
    document.getElementById('totalRecords').textContent = totalRecords;
    
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button onclick="changePage(${currentPage - 1})" 
                ${currentPage === 1 ? 'disabled' : ''} 
                class="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition">
            ← Trước
        </button>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <button onclick="changePage(${i})" 
                        class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition ${i === currentPage ? 'bg-indigo-600 text-white border-indigo-600' : ''}">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `<span class="px-2">...</span>`;
        }
    }
    
    // Next button
    paginationHTML += `
        <button onclick="changePage(${currentPage + 1})" 
                ${currentPage === totalPages ? 'disabled' : ''} 
                class="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition">
            Sau →
        </button>
    `;
    
    pagination.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
    const totalPages = Math.ceil(filteredStudents.length / pageSize);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderStudentsTable();
}

// Search students
function searchStudents() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    
    if (!searchTerm) {
        filteredStudents = allStudents;
    } else {
        filteredStudents = searchInArray(allStudents, searchTerm, ['studentCode', 'fullname', 'class', 'major', 'email']);
    }
    
    currentPage = 1;
    renderStudentsTable();
}

// Show modal
function showModal(title, studentData = null) {
    const modal = document.getElementById('studentModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('studentForm');
    
    modalTitle.textContent = title;
    modal.classList.remove('hidden');
    
    if (studentData) {
        editingStudentId = studentData.id;
        document.getElementById('studentId').value = studentData.id;
        document.getElementById('studentCode').value = studentData.studentCode;
        document.getElementById('fullname').value = studentData.fullname;
        document.getElementById('dateOfBirth').value = studentData.dateOfBirth;
        document.getElementById('gender').value = studentData.gender;
        document.getElementById('email').value = studentData.email;
        document.getElementById('phone').value = studentData.phone;
        document.getElementById('address').value = studentData.address || '';
        document.getElementById('major').value = studentData.major;
        document.getElementById('class').value = studentData.class;
        document.getElementById('enrollmentYear').value = studentData.enrollmentYear;
        document.getElementById('status').value = studentData.status;
    } else {
        editingStudentId = null;
        form.reset();
    }
}

// Hide modal
function hideModal() {
    const modal = document.getElementById('studentModal');
    modal.classList.add('hidden');
    editingStudentId = null;
}

// View student
function viewStudent(id) {
    const student = allStudents.find(s => s.id === id);
    if (!student) return;
    
    const genderText = student.gender === 'male' ? 'Nam' : 'Nữ';
    const statusText = student.status === 'active' ? 'Đang học' : 
                      student.status === 'inactive' ? 'Tạm nghỉ' : 'Đã tốt nghiệp';
    
    const message = `
        Mã sinh viên: ${student.studentCode}
        Họ và tên: ${student.fullname}
        Ngày sinh: ${formatDate(student.dateOfBirth)}
        Giới tính: ${genderText}
        Email: ${student.email}
        Số điện thoại: ${student.phone}
        Địa chỉ: ${student.address || 'Chưa cập nhật'}
        Chuyên ngành: ${student.major}
        Lớp: ${student.class}
        Năm nhập học: ${student.enrollmentYear}
        Trạng thái: ${statusText}
    `;
    
    alert(message);
}

// Edit student
function editStudent(id) {
    const student = allStudents.find(s => s.id === id);
    if (!student) return;
    
    showModal('Chỉnh sửa thông tin sinh viên', student);
}

// Delete student
function deleteStudent(id) {
    if (!confirmDialog('Bạn có chắc chắn muốn xóa sinh viên này?')) {
        return;
    }
    
    const students = getStudents();
    const updatedStudents = students.filter(s => s.id !== id);
    saveStudents(updatedStudents);
    
    showToast('Xóa sinh viên thành công!', 'success');
    loadStudents();
}

// Save student
function saveStudent(e) {
    e.preventDefault();
    
    const formData = {
        studentCode: document.getElementById('studentCode').value.trim(),
        fullname: document.getElementById('fullname').value.trim(),
        dateOfBirth: document.getElementById('dateOfBirth').value,
        gender: document.getElementById('gender').value,
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        address: document.getElementById('address').value.trim(),
        major: document.getElementById('major').value.trim(),
        class: document.getElementById('class').value.trim(),
        enrollmentYear: parseInt(document.getElementById('enrollmentYear').value),
        status: document.getElementById('status').value
    };
    
    // Validation
    if (!isValidEmail(formData.email)) {
        showToast('Email không hợp lệ', 'error');
        return;
    }
    
    if (!isValidPhone(formData.phone)) {
        showToast('Số điện thoại không hợp lệ', 'error');
        return;
    }
    
    const students = getStudents();
    
    if (editingStudentId) {
        // Update existing student
        const index = students.findIndex(s => s.id === editingStudentId);
        if (index !== -1) {
            // Check duplicate student code (except current)
            if (students.some(s => s.studentCode === formData.studentCode && s.id !== editingStudentId)) {
                showToast('Mã sinh viên đã tồn tại', 'error');
                return;
            }
            
            students[index] = {
                ...students[index],
                ...formData,
                updatedAt: new Date().toISOString()
            };
            
            saveStudents(students);
            showToast('Cập nhật sinh viên thành công!', 'success');
        }
    } else {
        // Add new student
        // Check duplicate student code
        if (students.some(s => s.studentCode === formData.studentCode)) {
            showToast('Mã sinh viên đã tồn tại', 'error');
            return;
        }
        
        const newStudent = {
            id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
            ...formData,
            createdAt: new Date().toISOString()
        };
        
        students.push(newStudent);
        saveStudents(students);
        showToast('Thêm sinh viên thành công!', 'success');
    }
    
    hideModal();
    loadStudents();
}

// Export students to CSV
function exportStudents() {
    if (filteredStudents.length === 0) {
        showToast('Không có dữ liệu để xuất', 'warning');
        return;
    }
    
    const exportData = filteredStudents.map(student => ({
        'Mã SV': student.studentCode,
        'Họ và tên': student.fullname,
        'Ngày sinh': formatDate(student.dateOfBirth),
        'Giới tính': student.gender === 'male' ? 'Nam' : 'Nữ',
        'Email': student.email,
        'Số điện thoại': student.phone,
        'Địa chỉ': student.address || '',
        'Chuyên ngành': student.major,
        'Lớp': student.class,
        'Năm nhập học': student.enrollmentYear,
        'Trạng thái': student.status === 'active' ? 'Đang học' : student.status === 'inactive' ? 'Tạm nghỉ' : 'Đã tốt nghiệp'
    }));
    
    exportToCSV(exportData, 'danh-sach-sinh-vien.csv');
    showToast('Xuất dữ liệu thành công!', 'success');
}

// Event listeners
document.getElementById('addStudentBtn').addEventListener('click', () => {
    showModal('Thêm sinh viên mới');
});

document.getElementById('closeModalBtn').addEventListener('click', hideModal);
document.getElementById('cancelBtn').addEventListener('click', hideModal);

document.getElementById('studentForm').addEventListener('submit', saveStudent);

document.getElementById('searchInput').addEventListener('keyup', debounce(searchStudents, 300));
document.getElementById('searchBtn').addEventListener('click', searchStudents);

document.getElementById('exportBtn').addEventListener('click', exportStudents);

// Close modal when clicking outside
document.getElementById('studentModal').addEventListener('click', (e) => {
    if (e.target.id === 'studentModal') {
        hideModal();
    }
});

// Initialize
loadStudents();
