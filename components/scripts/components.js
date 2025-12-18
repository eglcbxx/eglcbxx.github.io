/* ============================================
   COMPONENT LOADER
   Loads header and footer from separate files
============================================ */

async function loadComponents() {
    try {
        // Load header
        const headerResponse = await fetch('components/layout/header.html');
        const headerHTML = await headerResponse.text();
        document.getElementById('header-placeholder').innerHTML = headerHTML;

        // Load footer
        const footerResponse = await fetch('components/layout/footer.html');
        const footerHTML = await footerResponse.text();
        document.getElementById('footer-placeholder').innerHTML = footerHTML;

        // Initialize after components are loaded
        initializeNavigation();
        initializeFooter();

        // Load dynamic content based on page
        await loadPageContent();
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

function initializeNavigation() {
    const page = document.body.dataset.page;
    document.querySelectorAll("a[data-page]").forEach(a => {
        if (a.dataset.page === page) a.classList.add("active");
    });
}

function initializeFooter() {
    document.getElementById("year").textContent = new Date().getFullYear();
}

async function loadPageContent() {
    const page = document.body.dataset.page;

    if (page === 'index') {
        // Load skills and strengths
        await window.templateEngine.renderIntoContainer('skills-container', 'skill-card', 'skills', 'skills');
        await window.templateEngine.renderIntoContainer('strengths-container', 'strength-card', 'strengths', 'strengths');
    } else if (page === 'portfolio') {
        // Load projects
        await window.templateEngine.renderIntoContainer('projects-container', 'project-card', 'projects', 'projects');
    } else if (page === 'links') {
        // Load resources
        await window.templateEngine.renderIntoContainer('resources-container', 'resource-card', 'resources', 'resources');
    }

    // Initialize all interactive features after content is loaded
    if (typeof initScrollAnimations === 'function') initScrollAnimations();
    if (typeof initSkillCards === 'function') initSkillCards();
    if (typeof initPortfolioFilters === 'function') initPortfolioFilters();
    if (typeof initProjectModals === 'function') initProjectModals();
    if (typeof initPageTransitions === 'function') initPageTransitions();
    if (typeof initScrollProgress === 'function') initScrollProgress();
    if (typeof initThemeSwitcher === 'function') initThemeSwitcher();
    if (typeof initStickyIndicator === 'function') initStickyIndicator();
    if (typeof setupContactForm === 'function') setupContactForm();
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', loadComponents);
