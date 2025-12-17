/* ============================================
   SCROLL ANIMATIONS (IntersectionObserver)
============================================ */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  document.querySelectorAll('.animate-on-scroll, .animate-fade, .animate-slide-left, .animate-slide-right').forEach(el => {
    observer.observe(el);
  });
}

/* ============================================
   CONTACT FORM
============================================ */
function setupContactForm(){
  const form = document.querySelector("#contactForm");
  if(!form) return;

  const emailInput = document.querySelector("#email");
  const messageInput = document.querySelector("#message");

  // Add form groups and error messages
  const emailGroup = emailInput.parentElement;
  const messageGroup = messageInput.parentElement;

  emailGroup.classList.add('form-group');
  messageGroup.classList.add('form-group');

  const emailError = document.createElement('div');
  emailError.className = 'form-error';
  emailError.textContent = 'Please enter a valid email address';
  emailInput.parentNode.appendChild(emailError);

  const messageError = document.createElement('div');
  messageError.className = 'form-error';
  messageError.textContent = 'Message must be at least 10 characters';
  messageInput.parentNode.appendChild(messageError);

  // Live validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  emailInput.addEventListener('blur', () => {
    const value = emailInput.value.trim();
    if (!value || !validateEmail(value)) {
      emailInput.classList.add('error');
      emailInput.classList.remove('success');
      emailError.classList.add('active');
    } else {
      emailInput.classList.remove('error');
      emailInput.classList.add('success');
      emailError.classList.remove('active');
    }
  });

  emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
      const value = emailInput.value.trim();
      if (value && validateEmail(value)) {
        emailInput.classList.remove('error');
        emailInput.classList.add('success');
        emailError.classList.remove('active');
      }
    }
  });

  messageInput.addEventListener('blur', () => {
    const value = messageInput.value.trim();
    if (!value || value.length < 10) {
      messageInput.classList.add('error');
      messageInput.classList.remove('success');
      messageError.classList.add('active');
    } else {
      messageInput.classList.remove('error');
      messageInput.classList.add('success');
      messageError.classList.remove('active');
    }
  });

  messageInput.addEventListener('input', () => {
    if (messageInput.classList.contains('error')) {
      const value = messageInput.value.trim();
      if (value && value.length >= 10) {
        messageInput.classList.remove('error');
        messageInput.classList.add('success');
        messageError.classList.remove('active');
      }
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    let hasError = false;

    if(!email || !validateEmail(email)){
      emailInput.classList.add('error');
      emailError.classList.add('active');
      hasError = true;
    }

    if(!message || message.length < 10){
      messageInput.classList.add('error');
      messageError.classList.add('active');
      hasError = true;
    }

    if (hasError) return;

    const to = "YOUR_EMAIL_HERE@example.com";
    const subject = encodeURIComponent(`Portfolio contact from ${email}`);
    const body = encodeURIComponent(`From: ${email}\n\nMessage:\n${message}`);

    // Opens the user's default email app
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}

/* ============================================
   INITIALIZATION
============================================ */
document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations();
  setupContactForm();
  initPageTransitions();
  initScrollProgress();
  initThemeSwitcher();
  initStickyIndicator();
  
  // Page-specific initializations
  if (document.body.dataset.page === 'portfolio') {
    initProjectModals();
    initPortfolioFilters();
  }
  
  if (document.body.dataset.page === 'index') {
    initSkillCards();
  }
});

/* ============================================
   INTERACTIVE SKILL CARDS
============================================ */
function initSkillCards() {
  const skillCards = document.querySelectorAll('.skill-card');
  
  // Animate skill bars when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.5 });

  skillCards.forEach(card => {
    observer.observe(card);
    
    // Toggle expanded state on click
    card.addEventListener('click', () => {
      const isExpanded = card.classList.contains('expanded');
      
      // Close all other cards
      skillCards.forEach(c => c.classList.remove('expanded'));
      
      // Toggle current card
      if (!isExpanded) {
        card.classList.add('expanded');
      }
    });
  });
}

/* ============================================
   PORTFOLIO FILTERS
============================================ */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-item');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter projects
      projects.forEach(project => {
        const category = project.dataset.category;
        
        if (filter === 'all' || category === filter) {
          project.classList.remove('hidden');
        } else {
          project.classList.add('hidden');
        }
      });
    });
  });
}

/* ============================================
   STICKY SCROLL INDICATOR
============================================ */
function initStickyIndicator() {
  // Only show on pages with multiple sections
  const sections = document.querySelectorAll('main section, main > h1, main > h2');
  if (sections.length < 2) return;

  const indicator = document.createElement('div');
  indicator.className = 'sticky-indicator';

  // Create dots for each major section
  const dots = [];
  sections.forEach((section, index) => {
    const dot = document.createElement('div');
    dot.className = 'sticky-dot';
    
    // Get section title
    let label = section.tagName === 'SECTION' ? 
      (section.querySelector('h1, h2')?.textContent || `Section ${index + 1}`) :
      section.textContent;
    
    dot.setAttribute('data-label', label);
    dot.addEventListener('click', () => {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    
    indicator.appendChild(dot);
    dots.push({ dot, section });
  });

  document.body.appendChild(indicator);

  // Update active dot on scroll
  const updateActiveDot = () => {
    const scrollPos = window.scrollY + 100;
    
    dots.forEach(({ dot, section }) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveDot);
  updateActiveDot();
}

/* ============================================
   PAGE TRANSITIONS
============================================ */
function initPageTransitions() {
  // Get all internal navigation links
  const links = document.querySelectorAll('a[href^="index.html"], a[href^="portfolio.html"], a[href^="links.html"], a[href^="contact.html"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetUrl = link.getAttribute('href');
      
      // Add exit animation
      document.body.classList.add('page-exit');
      
      // Navigate after animation completes
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 300);
    });
  });
}

/* ============================================
   SCROLL PROGRESS INDICATOR
============================================ */
function initScrollProgress() {
  // Create progress bar element
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  // Update progress on scroll
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

/* ============================================
   THEME SWITCHER
============================================ */
function initThemeSwitcher() {
  // Create theme toggle button
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.setAttribute('aria-label', 'Toggle theme');
  
  // Get saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggle.setAttribute('data-theme', savedTheme);
  
  // Add icons
  themeToggle.innerHTML = `
    <svg class="theme-icon sun-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
    </svg>
    <svg class="theme-icon moon-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
    </svg>
  `;
  
  // Toggle theme on click
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
  
  document.body.appendChild(themeToggle);
}

/* ============================================
   PROJECT CASE STUDY MODALS
============================================ */
function initProjectModals() {
  // Project data
  const projects = {
    'project1': {
      title: 'Rocket Elevators Website (Static Front-End)',
      problem: 'The existing website was based on a Smarty Template and did not reflect the Rocket Elevators brand or business requirements.',
      solution: 'Rebuilt the website by removing all template-specific references, updating content and links, and creating new pages aligned with the Rocket Elevators identity.',
      tech: ['HTML', 'CSS'],
      lessons: [
        'Understanding and refactoring legacy HTML templates',
        'Structuring a multi-page static website',
        'Applying semantic HTML best practices',
        'Creating consistent layouts and navigation',
        'Styling pages using CSS for branding and readability'
      ],
      github: 'https://github.com/eglcbxx'
    },
    'project2': {
      title: 'Elevator Quote Form',
      problem: 'There was no system in place to generate elevator pricing based on different building types.',
      solution: 'Designed and implemented a dynamic quote form that calculates pricing based on user input and building specifications.',
      tech: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
      lessons: [
        'Building interactive forms with JavaScript',
        'Handling user input and form validation',
        'Implementing business logic on the client side',
        'Using Bootstrap for responsive layouts',
        'Improving UX through dynamic feedback'
      ],
      github: 'https://github.com/eglcbxx'
    },
    'project3': {
      title: 'Introduction to Node.js & Express',
      problem: 'Lack of understanding of how server-side applications work with Node.js and Express.',
      solution: 'Created a simple backend server using Express with basic endpoints to handle requests and responses.',
      tech: ['Node.js', 'Express', 'JavaScript', 'Nodemon'],
      lessons: [
        'Understanding the client–server architecture',
        'Creating RESTful endpoints with Express',
        'Handling HTTP requests and responses',
        'Using Nodemon for development efficiency',
        'Organizing a basic backend project structure'
      ],
      github: 'https://github.com/eglcbxx'
    },
    'project4': {
      title: 'Node.js Backend with Database',
      problem: 'No experience connecting a backend server to a database.',
      solution: 'Extended the Express server by integrating MongoDB for data storage and management using Mongoose.',
      tech: ['Node.js', 'Express', 'JavaScript', 'Nodemon', 'MongoDB', 'Mongoose'],
      lessons: [
        'Connecting a backend to a NoSQL database',
        'Designing schemas and models with Mongoose',
        'Performing CRUD operations',
        'Managing asynchronous database operations',
        'Structuring a scalable backend architecture'
      ],
      github: 'https://github.com/eglcbxx'
    },
    'project5': {
      title: 'Agent Management Web Application',
      problem: 'A web application was needed to manage agents, authentication, and operational data.',
      solution: 'Built a full MERN stack admin application with authentication, session tokens, CRUD operations, reporting, and transaction management.',
      tech: ['MongoDB', 'Express', 'React', 'Node.js', 'MERN Stack'],
      lessons: [
        'Building full-stack applications',
        'Implementing authentication and session management',
        'Securing API endpoints',
        'Managing complex CRUD workflows',
        'Creating dashboards and reports',
        'Connecting frontend and backend in a production-ready app'
      ],
      github: 'https://github.com/eglcbxx'
    },
    'project6': {
      title: 'Blog Platform',
      problem: 'A complete blogging system was required to manage content and users.',
      solution: 'Developed a MERN-based blog application with user registration, authentication, post creation, comments, and admin content management.',
      tech: ['MongoDB', 'Express', 'React', 'Node.js', 'MERN Stack'],
      lessons: [
        'Designing role-based user systems',
        'Managing content workflows (posts, comments)',
        'Implementing user authentication and authorization',
        'Building reusable React components',
        'Handling relational-like data in MongoDB'
      ],
      github: 'https://github.com/eglcbxx'
    },
    'project7': {
      title: 'Rocket Food Back Office',
      problem: 'The Rocket Food mobile application lacked a back-office system for managing data.',
      solution: 'Developed a backend server and administrative back office using Java to manage application data.',
      tech: ['Java', 'MySQL'],
      lessons: [
        'Understanding backend development with Java',
        'Designing relational databases with MySQL',
        'Implementing CRUD operations in Java',
        'Building admin tools for data management',
        'Applying MVC concepts in backend systems'
      ],
      github: 'https://github.com/eglcbxx'
    },
    'project8': {
      title: 'Mobile Application Development',
      problem: 'No mobile application was available for users.',
      solution: 'Built a mobile application using React Native and connected it to the existing Java backend server.',
      tech: ['React Native', 'Java'],
      lessons: [
        'Building cross-platform mobile applications',
        'Connecting mobile apps to backend APIs',
        'Managing application state and navigation',
        'Understanding mobile UX best practices',
        'Integrating frontend and backend systems'
      ],
      github: 'https://github.com/eglcbxx'
    },
    'project9': {
      title: 'AI-Enhanced Portfolio',
      problem: 'Creating a professional portfolio from scratch is time-consuming and requires balancing design, functionality, and best practices.',
      solution: 'Leveraged AI tools (GitHub Copilot, ChatGPT, Claude) to rapidly prototype and build this interactive portfolio with advanced animations, accessibility features, and modern UX patterns.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'AI Tools (Copilot, ChatGPT, Claude)', 'Responsive Design'],
      lessons: [
        'Advanced prompt engineering for code generation',
        'Effective use of AI for rapid prototyping and iteration',
        'Combining AI suggestions with human expertise',
        'Implementing scroll animations and micro-interactions',
        'Building accessible, semantic HTML structures',
        'AI-assisted debugging and refactoring workflows'
      ],
      github: 'https://github.com/eglcbxx/eglcbxx.github.io'
    }
  };

  // Create modal structure
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" aria-label="Close modal">×</button>
      <div id="modalBody"></div>
    </div>
  `;
  document.body.appendChild(modal);

  // Close modal handlers
  const closeModal = () => modal.classList.remove('active');
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Open modal for project cards
  document.querySelectorAll('.card').forEach((card, index) => {
    const projectKey = `project${index + 1}`;
    if (projects[projectKey]) {
      card.parentElement.classList.add('project-card-clickable');
      card.addEventListener('click', () => {
        const project = projects[projectKey];
        const modalBody = document.getElementById('modalBody');
        
        modalBody.innerHTML = `
          <h2>${project.title}</h2>
          
          <div class="modal-section">
            <h4>🎯 Problem</h4>
            <p class="small">${project.problem}</p>
          </div>
          
          <div class="modal-section">
            <h4>💡 Solution</h4>
            <p class="small">${project.solution}</p>
          </div>
          
          <div class="modal-section">
            <h4>🛠️ Technologies</h4>
            <div class="modal-tech">
              ${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
          </div>
          
          <div class="modal-section">
            <h4>📚 Key Learnings</h4>
            <ul>
              ${project.lessons.map(l => `<li class="small">${l}</li>`).join('')}
            </ul>
          </div>
          
          <div class="modal-section">
            <a href="${project.github}" target="_blank" rel="noreferrer">View on GitHub →</a>
          </div>
        `;
        
        modal.classList.add('active');
      });
    }
  });
  
  // Keyboard accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}