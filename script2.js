function switchTab(tabId) {
    // 1. Hide all sections
    document.querySelectorAll('.tab-content').forEach(section => {
        section.style.display = 'none';
    });

    // 2. Show the clicked section
    document.getElementById(tabId + '-section').style.display = 'block';

    // 3. Close the mobile menu automatically after clicking
    const navCollapse = document.getElementById('mainNav');
    const bsCollapse = new bootstrap.Collapse(navCollapse, { toggle: false });
    bsCollapse.hide();
}