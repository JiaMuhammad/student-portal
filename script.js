// Sample student data
const attendanceData = [
    { code: "CS-301", title: "Web Engineering", total: 32, attended: 30 },
    { code: "CS-305", title: "Database Systems", total: 30, attended: 25 },
    { code: "CS-312", title: "Operating Systems", total: 28, attended: 26 },
    { code: "MT-201", title: "Linear Algebra", total: 30, attended: 22 }
];

// DOM Elements
const loginForm = document.getElementById('login-form');
const loginContainer = document.getElementById('login-container');
const dashboardContainer = document.getElementById('dashboard-container');
const logoutBtn = document.getElementById('logout-btn');
const navItems = document.querySelectorAll('.nav-links li');
const sections = document.querySelectorAll('.content-section');
const pageTitle = document.getElementById('page-title');

// 1. Handle Login
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const rollNo = document.getElementById('roll-no').value.trim();
    const password = document.getElementById('password').value.trim();

    if (rollNo !== "" && password !== "") {
        document.getElementById('student-id').textContent = rollNo.toUpperCase();
        loginContainer.classList.add('hidden');
        dashboardContainer.classList.remove('hidden');
        renderAttendance();
    } else {
        document.getElementById('login-error').textContent = "Please enter valid credentials.";
    }
});

// 2. Handle Logout
logoutBtn.addEventListener('click', function() {
    dashboardContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
    loginForm.reset();
});

// 3. Handle Sidebar Navigation
navItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all links
        navItems.forEach(nav => nav.classList.remove('active'));
        // Add active class to clicked link
        this.classList.add('active');

        // Update Header Title
        pageTitle.textContent = this.textContent;

        // Hide all sections, show target section
        const targetId = this.getAttribute('data-target');
        sections.forEach(sec => {
            if (sec.id === targetId) {
                sec.classList.remove('hidden');
            } else {
                sec.classList.add('hidden');
            }
        });
    });
});

// 4. Dynamically Render Attendance Table
function renderAttendance() {
    const tbody = document.getElementById('attendance-table-body');
    tbody.innerHTML = '';

    attendanceData.forEach(course => {
        const percentage = Math.round((course.attended / course.total) * 100);
        const color = percentage < 75 ? 'red' : 'green';
        
        const row = `
            <tr>
                <td>${course.code}</td>
                <td>${course.title}</td>
                <td>${course.total}</td>
                <td>${course.attended}</td>
                <td style="color: ${color}; font-weight: bold;">${percentage}%</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}