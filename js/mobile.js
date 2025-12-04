// Mobile menu functionality
function initMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (!sidebar || !mobileMenuBtn) return;
    
    // Toggle sidebar
    function toggleSidebar() {
        sidebar.classList.toggle('-translate-x-full');
        if (overlay) {
            overlay.classList.toggle('hidden');
        }
    }
    
    // Open sidebar
    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.remove('-translate-x-full');
        if (overlay) {
            overlay.classList.remove('hidden');
        }
    });
    
    // Close sidebar
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', toggleSidebar);
    }
    
    // Close when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', toggleSidebar);
    }
    
    // Close sidebar on navigation (mobile)
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                toggleSidebar();
            }
        });
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}
