// Mock data initialization
function initializeMockData() {
    // Initialize students data
    if (!localStorage.getItem('qlsv_students')) {
        const students = [
            {
                id: 1,
                studentCode: 'SV001',
                fullname: 'Nguyễn Văn An',
                dateOfBirth: '2003-05-15',
                gender: 'male',
                email: 'nguyenvanan@student.edu.vn',
                phone: '0901234567',
                address: 'Hà Nội',
                major: 'Công nghệ thông tin',
                class: 'CNTT01',
                enrollmentYear: 2021,
                status: 'active',
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                studentCode: 'SV002',
                fullname: 'Trần Thị Bích',
                dateOfBirth: '2003-08-20',
                gender: 'female',
                email: 'tranthibich@student.edu.vn',
                phone: '0902345678',
                address: 'Hồ Chí Minh',
                major: 'Quản trị kinh doanh',
                class: 'QTKD01',
                enrollmentYear: 2021,
                status: 'active',
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                studentCode: 'SV003',
                fullname: 'Lê Minh Cường',
                dateOfBirth: '2002-12-10',
                gender: 'male',
                email: 'leminhcuong@student.edu.vn',
                phone: '0903456789',
                address: 'Đà Nẵng',
                major: 'Kỹ thuật phần mềm',
                class: 'KTPM01',
                enrollmentYear: 2020,
                status: 'active',
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('qlsv_students', JSON.stringify(students));
    }
    
    // Initialize subjects data
    if (!localStorage.getItem('qlsv_subjects')) {
        const subjects = [
            { id: 1, code: 'IT101', name: 'Lập trình cơ bản', credits: 3, department: 'CNTT' },
            { id: 2, code: 'IT102', name: 'Cấu trúc dữ liệu', credits: 4, department: 'CNTT' },
            { id: 3, code: 'IT103', name: 'Cơ sở dữ liệu', credits: 3, department: 'CNTT' },
            { id: 4, code: 'IT104', name: 'Mạng máy tính', credits: 3, department: 'CNTT' },
            { id: 5, code: 'BUS101', name: 'Quản trị học', credits: 3, department: 'QTKD' },
            { id: 6, code: 'BUS102', name: 'Marketing căn bản', credits: 3, department: 'QTKD' }
        ];
        localStorage.setItem('qlsv_subjects', JSON.stringify(subjects));
    }
    
    // Initialize schedules data
    if (!localStorage.getItem('qlsv_schedules')) {
        const schedules = [
            {
                id: 1,
                subjectCode: 'IT101',
                subjectName: 'Lập trình cơ bản',
                class: 'CNTT01',
                teacher: 'TS. Nguyễn Văn Huy',
                dayOfWeek: 'Thứ 2',
                startTime: '07:30',
                endTime: '09:30',
                room: 'A101',
                semester: '1/2023-2024'
            },
            {
                id: 2,
                subjectCode: 'IT102',
                subjectName: 'Cấu trúc dữ liệu',
                class: 'CNTT01',
                teacher: 'TS. Trần Thị Dung',
                dayOfWeek: 'Thứ 3',
                startTime: '09:45',
                endTime: '11:45',
                room: 'A102',
                semester: '1/2023-2024'
            },
            {
                id: 3,
                subjectCode: 'IT103',
                subjectName: 'Cơ sở dữ liệu',
                class: 'CNTT01',
                teacher: 'ThS. Lê Văn C',
                dayOfWeek: 'Thứ 4',
                startTime: '13:00',
                endTime: '15:00',
                room: 'B201',
                semester: '1/2023-2024'
            }
        ];
        localStorage.setItem('qlsv_schedules', JSON.stringify(schedules));
    }
    
    // Initialize grades data
    if (!localStorage.getItem('qlsv_grades')) {
        const grades = [
            {
                id: 1,
                studentId: 1,
                studentCode: 'SV001',
                studentName: 'Nguyễn Văn An',
                subjectCode: 'IT101',
                subjectName: 'Lập trình cơ bản',
                midtermScore: 7.5,
                finalScore: 8.0,
                averageScore: 7.8,
                semester: '1/2023-2024',
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                studentId: 1,
                studentCode: 'SV001',
                studentName: 'Nguyễn Văn An',
                subjectCode: 'IT102',
                subjectName: 'Cấu trúc dữ liệu',
                midtermScore: 8.0,
                finalScore: 8.5,
                averageScore: 8.3,
                semester: '1/2023-2024',
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                studentId: 2,
                studentCode: 'SV002',
                studentName: 'Trần Thị Bích',
                subjectCode: 'BUS101',
                subjectName: 'Quản trị học',
                midtermScore: 9.0,
                finalScore: 9.5,
                averageScore: 9.3,
                semester: '1/2023-2024',
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('qlsv_grades', JSON.stringify(grades));
    }
    
    // Initialize notifications data
    if (!localStorage.getItem('qlsv_notifications')) {
        const notifications = [
            {
                id: 1,
                title: 'Thông báo lịch thi học kỳ 1',
                content: 'Lịch thi học kỳ 1 năm học 2023-2024 đã được công bố. Sinh viên vui lòng xem chi tiết.',
                type: 'exam',
                priority: 'high',
                createdBy: 'admin',
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                isRead: false
            },
            {
                id: 2,
                title: 'Đăng ký học phần học kỳ 2',
                content: 'Sinh viên đăng ký học phần học kỳ 2 từ ngày 15/01 đến 30/01/2024.',
                type: 'registration',
                priority: 'high',
                createdBy: 'admin',
                createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                isRead: false
            },
            {
                id: 3,
                title: 'Thông báo nghỉ học',
                content: 'Trường thông báo nghỉ học vào ngày 20/11/2023 nhân dịp Ngày Nhà giáo Việt Nam.',
                type: 'holiday',
                priority: 'medium',
                createdBy: 'admin',
                createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                isRead: true
            }
        ];
        localStorage.setItem('qlsv_notifications', JSON.stringify(notifications));
    }
}

// Get data from localStorage
function getStudents() {
    const data = localStorage.getItem('qlsv_students');
    return data ? JSON.parse(data) : [];
}

function getSubjects() {
    const data = localStorage.getItem('qlsv_subjects');
    return data ? JSON.parse(data) : [];
}

function getSchedules() {
    const data = localStorage.getItem('qlsv_schedules');
    return data ? JSON.parse(data) : [];
}

function getGrades() {
    const data = localStorage.getItem('qlsv_grades');
    return data ? JSON.parse(data) : [];
}

function getNotifications() {
    const data = localStorage.getItem('qlsv_notifications');
    return data ? JSON.parse(data) : [];
}

function getUsers() {
    const data = localStorage.getItem('qlsv_users');
    return data ? JSON.parse(data) : [];
}

// Save data to localStorage
function saveStudents(students) {
    localStorage.setItem('qlsv_students', JSON.stringify(students));
}

function saveSubjects(subjects) {
    localStorage.setItem('qlsv_subjects', JSON.stringify(subjects));
}

function saveSchedules(schedules) {
    localStorage.setItem('qlsv_schedules', JSON.stringify(schedules));
}

function saveGrades(grades) {
    localStorage.setItem('qlsv_grades', JSON.stringify(grades));
}

function saveNotifications(notifications) {
    localStorage.setItem('qlsv_notifications', JSON.stringify(notifications));
}

function saveUsers(users) {
    localStorage.setItem('qlsv_users', JSON.stringify(users));
}

// Initialize mock data on load
initializeMockData();
