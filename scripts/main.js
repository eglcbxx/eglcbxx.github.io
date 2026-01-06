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
   CONTACT FORM - Google Apps Script Integration
============================================ */
function setupContactForm(){
  const form = document.querySelector("#contactForm");
  if(!form) return;

  const emailInput = document.querySelector("#email");
  const submitBtn = document.querySelector("#submitBtn");
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  const formMessage = document.querySelector("#formMessage");

  // Add form group and error message
  emailInput.parentElement.classList.add('form-group');

  const emailError = document.createElement('div');
  emailError.className = 'form-error';
  emailError.textContent = translate('contact.invalidEmail') || 'Please enter a valid email address';
  emailError.setAttribute('data-i18n', 'contact.invalidEmail');
  emailInput.parentNode.appendChild(emailError);

  // Email validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Live validation
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
    // Clear previous messages when typing
    formMessage.className = 'form-message';
    formMessage.textContent = '';
  });

  // Form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    // Validate
    if(!email || !validateEmail(email)){
      emailInput.classList.add('error');
      emailError.classList.add('active');
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    formMessage.className = 'form-message';
    formMessage.textContent = '';

    try {
      // Get reCAPTCHA token (IMPORTANT: Replace with your actual site key)
      const RECAPTCHA_SITE_KEY = '6Ld9JEIsAAAAAMPrhtM1pLkRZUe46GLhl9bMWK4f';
      const recaptchaToken = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' });
      
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxPLlipVqcepDB1WxTL1jY2ED4jkGAXNiKuB-pljJg3rTq4pqCCmyPVJFReNUMjkYdk/exec';
      
      // Get current origin for security validation
      const origin = window.location.origin;
      
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          origin,
          recaptchaToken
        })
      });

      // Note: With no-cors mode, we can't read the response
      // Assume success if no error was thrown
      formMessage.className = 'form-message success active';
      formMessage.textContent = translate('contact.success') || 'Message sent! Check your email inbox.';
      
      // Clear form
      emailInput.value = '';
      emailInput.classList.remove('success', 'error');
      emailError.classList.remove('active');

    } catch (error) {
      console.error('Form submission error:', error);
      formMessage.className = 'form-message error active';
      formMessage.textContent = translate('contact.error') || 'Something went wrong. Please try again.';
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
    }
  });
}

/* ============================================
   INITIALIZATION
   NOTE: Content is loaded by components.js
   This runs AFTER templates are rendered
============================================ */
document.addEventListener("DOMContentLoaded", async () => {
  // Load translations first
  await loadTranslations();
  
  // Initialize language switcher
  initLanguageSwitcher();
  
  // Apply initial translations
  updatePageLanguage();
  
  // components.js will call these functions after loading content
  // Keeping this for backwards compatibility if someone loads page without components
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
    
    // Toggle expanded state on click (only for cards NOT in carousel)
    card.addEventListener('click', () => {
      // Don't expand if clicking inside carousel (handled by carousel)
      if (card.closest('.carousel-track')) return;
      
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
   INTERACTIVE STRENGTH CARDS
============================================ */
function initStrengthCards() {
  const strengthCards = document.querySelectorAll('.strength-card');
  
  strengthCards.forEach(card => {
    // Toggle expanded state on click
    card.addEventListener('click', (e) => {
      // Don't expand if clicking inside carousel (handled by carousel)
      if (card.closest('.carousel-track')) return;
      
      const isExpanded = card.classList.contains('expanded');
      
      // Close all other cards
      strengthCards.forEach(c => c.classList.remove('expanded'));
      
      // Toggle current card
      if (!isExpanded) {
        card.classList.add('expanded');
      }
    });
  });
}

/* ============================================
   CAROUSEL SLIDER - Seamless Infinite Loop
============================================ */
function initCarousel() {
  const carousels = document.querySelectorAll('.carousel-wrapper');
  
  carousels.forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    
    if (!track) {
      console.warn('No track found in carousel');
      return;
    }
    
    // Wait for cards to be rendered before proceeding
    const waitForCards = () => {
      return new Promise((resolve) => {
        const checkCards = () => {
          const cards = track.querySelectorAll('.skill-card, .strength-card');
          if (cards.length > 0 && cards[0].offsetWidth > 0) {
            resolve(Array.from(cards));
          } else {
            requestAnimationFrame(checkCards);
          }
        };
        checkCards();
      });
    };
    
    waitForCards().then((originalCards) => {
      console.log(`Initializing carousel ${wrapper.id} with ${originalCards.length} cards`);
      
      // Simple double strategy: [OriginalCards] [CloneSet]
      // Clone cards and append after originals
      originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        
        // Get the computed height of the original card
        const originalHeight = card.offsetHeight;
        
        // Ensure clone has exact same styling and dimensions as original
        clone.style.visibility = 'visible';
        clone.style.opacity = '1';
        clone.style.display = '';
        clone.style.boxSizing = 'border-box';
        clone.style.margin = '0';
        clone.style.height = `${originalHeight}px`; // Force exact height match
        clone.style.minHeight = `${originalHeight}px`;
        clone.style.verticalAlign = 'top';
        
        track.appendChild(clone);
      });
      
      console.log(`Total cards after cloning: ${track.children.length}`);
      
      // Calculate dimensions AFTER cloning to ensure accurate measurements
      const firstCard = track.children[0];
      const cardWidth = firstCard.offsetWidth;
      const computedStyle = window.getComputedStyle(track);
      const gapWidth = parseInt(computedStyle.gap) || 20;
      const singleCardWidth = cardWidth + gapWidth;
      
      // Width of one complete set
      const cardsPerSet = originalCards.length;
      const setWidth = cardsPerSet * singleCardWidth;
      
      console.log(`Card width: ${cardWidth}px, Gap: ${gapWidth}px, Single card width: ${singleCardWidth}px, Set width: ${setWidth}px, Cards per set: ${cardsPerSet}`);
      
      // Start position at 0 (showing originals)
      let currentPosition = 0;
      let animationId = null;
      let hasExpandedCard = false;
      let isAnimating = false; // Lock to prevent rapid clicks
      
      // Set initial position
      track.style.transform = `translate3d(0px, 0px, 0px)`;
      
      // Seamless infinite scroll - let clones show, then reset invisibly
      const animate = () => {
        if (hasExpandedCard) {
          animationId = requestAnimationFrame(animate);
          return;
        }
        
        currentPosition += 1.5; // Scroll speed in px/frame
        
        // Apply transform - this shows both original AND cloned cards
        track.style.transform = `translate3d(-${currentPosition}px, 0px, 0px)`;
        
        // Only reset after we've scrolled well into the cloned set
        // Reset when position exceeds setWidth (we're viewing clones that look identical to originals)
        if (currentPosition > setWidth) {
          // Clear any expanded states before resetting to avoid confusion between originals and clones
          track.querySelectorAll('.skill-card, .strength-card').forEach(c => c.classList.remove('expanded'));
          wrapper.classList.remove('has-expanded-card');
          hasExpandedCard = false;
          isAnimating = false;
          
          // Instantly jump back by exactly one setWidth
          // This is invisible because clones at position X look identical to originals at position X-setWidth
          track.style.transition = 'none';
          currentPosition = currentPosition - setWidth;
          track.style.transform = `translate3d(-${currentPosition}px, 0px, 0px)`;
          // Force reflow
          void track.offsetHeight;
        }
        
        animationId = requestAnimationFrame(animate);
      };
      
      const startAutoScroll = () => {
        if (animationId) return;
        animate();
      };
      
      const stopAutoScroll = () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      };
      
      // Start animation immediately
      startAutoScroll();
      
      // Card click to expand and center
      track.addEventListener('click', (e) => {
        const card = e.target.closest('.skill-card, .strength-card');
        if (!card) return;
        
        // Prevent clicks while animation is in progress
        if (isAnimating) return;
        
        // Don't expand if clicking details button or link
        if (e.target.classList.contains('details-toggle') || e.target.closest('.details-toggle')) {
          return;
        }
        if (e.target.tagName === 'A' || e.target.closest('a')) {
          return;
        }
        
        e.stopPropagation();
        e.preventDefault();
        
        // Check if THIS card is currently expanded BEFORE removing classes
        const wasExpanded = card.classList.contains('expanded');
        
        // Check if carousel has any expanded card state
        const hasExpandedState = wrapper.classList.contains('has-expanded-card');
        
        // If we have an expanded state and this card wasn't expanded, block the action
        if (hasExpandedState && !wasExpanded) {
          return;
        }
        
        // Lock to prevent rapid clicks
        isAnimating = true;
        
        // Close ALL cards first (clean slate)
        track.querySelectorAll('.skill-card, .strength-card').forEach(c => {
          c.classList.remove('expanded');
        });
        
        // If clicking on a different card (or clicking on a collapsed card)
        if (!wasExpanded) {
          // Stop auto-scroll when expanding a card
          hasExpandedCard = true;
          stopAutoScroll();
          
          // Add class to wrapper to trigger dimming effect
          wrapper.classList.add('has-expanded-card');
          
          // Expand the card
          card.classList.add('expanded');
          
          // Force reflow to ensure expanded class is applied
          void card.offsetHeight;
          
          // Wait for CSS expansion to start before centering
          setTimeout(() => {
            const cardRect = card.getBoundingClientRect();
            const wrapperRect = wrapper.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const wrapperCenter = wrapperRect.left + wrapperRect.width / 2;
            const adjustment = cardCenter - wrapperCenter;
            
            currentPosition += adjustment;
            track.style.transition = 'transform 0.3s ease';
            track.style.transform = `translate3d(-${currentPosition}px, 0px, 0px)`;
            
            setTimeout(() => {
              track.style.transition = 'none';
              // Unlock after all animations complete (expansion + centering)
              setTimeout(() => {
                isAnimating = false;
              }, 100);
            }, 300);
          }, 100);
        } else {
          // Clicking on the same expanded card - collapse it and resume scrolling
          hasExpandedCard = false;
          
          // Remove dimming effect
          wrapper.classList.remove('has-expanded-card');
          
          track.style.transition = 'none';
          
          // Wait for collapse animation to complete before allowing new expansions
          setTimeout(() => {
            // Normalize position to 0 - setWidth range
            while (currentPosition >= setWidth) {
              currentPosition -= setWidth;
            }
            
            track.style.transform = `translate3d(-${currentPosition}px, 0px, 0px)`;
            startAutoScroll();
            
            // Unlock after collapse is fully complete
            isAnimating = false;
          }, 350); // Wait for max-height transition to complete
        }
      });
    });
  });
}

/* ============================================
   IMAGE MODAL
============================================ */
function initImageModal() {
  // Create image modal structure
  const imageModal = document.createElement('div');
  imageModal.className = 'image-modal';
  imageModal.innerHTML = `
    <button class="modal-close" aria-label="Close image">×</button>
    <div class="image-modal-content">
      <img id="modalImage" src="" alt="">
    </div>
  `;
  document.body.appendChild(imageModal);

  const modalImg = document.getElementById('modalImage');
  const closeBtn = imageModal.querySelector('.modal-close');

  // Close modal handlers
  const closeModal = () => imageModal.classList.remove('active');
  closeBtn.addEventListener('click', closeModal);
  imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal || e.target === modalImg) closeModal();
  });

  // Add click handlers to all project images
  document.querySelectorAll('.project-img').forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent card click
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      imageModal.classList.add('active');
    });
  });

  // Keyboard accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal.classList.contains('active')) {
      closeModal();
    }
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
   LANGUAGE SWITCHER & TRANSLATION SYSTEM
============================================ */
let translations = {};
let currentLanguage = 'en';

async function loadTranslations() {
  try {
    const response = await fetch('data/translations.json');
    translations = await response.json();
  } catch (error) {
    console.error('Error loading translations:', error);
  }
}

function translate(key) {
  const keys = key.split('.');
  let value = translations[currentLanguage];
  
  for (const k of keys) {
    if (value && value[k]) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return value;
}

function updatePageLanguage() {
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = translate(key);
    
    if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
      element.placeholder = translation;
    } else if (element.tagName === 'LABEL') {
      element.textContent = translation;
    } else {
      element.textContent = translation;
    }
  });
  
  // Update aria-label attributes
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    const key = element.getAttribute('data-i18n-aria');
    element.setAttribute('aria-label', translate(key));
  });
  
  // Update HTML lang attribute
  document.documentElement.setAttribute('lang', currentLanguage);
}

function initLanguageSwitcher() {
  // Create language toggle button
  const langToggle = document.createElement('button');
  langToggle.className = 'language-toggle';
  langToggle.setAttribute('aria-label', 'Change language');
  
  // Get saved language or default to English
  currentLanguage = localStorage.getItem('language') || 'en';
  
  // Create language menu
  const langMenu = document.createElement('div');
  langMenu.className = 'language-menu';
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'vn', name: 'Tiếng Việt' }
  ];
  
  languages.forEach(lang => {
    const option = document.createElement('div');
    option.className = 'language-option';
    if (lang.code === currentLanguage) {
      option.classList.add('active');
    }
    
    option.innerHTML = `
      <span class="lang-code">${lang.code.toUpperCase()}</span>
      <span class="lang-name">${lang.name}</span>
    `;
    
    option.addEventListener('click', async () => {
      currentLanguage = lang.code;
      localStorage.setItem('language', lang.code);
      
      // Update active state
      langMenu.querySelectorAll('.language-option').forEach(opt => {
        opt.classList.remove('active');
      });
      option.classList.add('active');
      
      // Update button text
      langToggle.textContent = lang.code.toUpperCase();
      
      // Update page language
      updatePageLanguage();
      
      // Close menu
      langMenu.classList.remove('active');
    });
    
    langMenu.appendChild(option);
  });
  
  // Set initial button text
  langToggle.textContent = currentLanguage.toUpperCase();
  
  // Toggle menu on button click
  langToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    langMenu.classList.toggle('active');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!langToggle.contains(e.target) && !langMenu.contains(e.target)) {
      langMenu.classList.remove('active');
    }
  });
  
  document.body.appendChild(langToggle);
  document.body.appendChild(langMenu);
}

/* ============================================
   PROJECT CASE STUDY MODALS
============================================ */
async function initProjectModals() {
  // Load project data from JSON
  const response = await fetch('data/projects.json');
  const data = await response.json();
  
  // Convert array to object with project IDs as keys
  const projects = {};
  data.projects.forEach(project => {
    projects[project.id] = {
      title: project.title,
      problem: project.modalData.problem,
      solution: project.modalData.solution,
      tech: project.modalData.tech,
      lessons: project.modalData.lessons,
      github: project.link
    };
  });

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

  // Open modal for project cards only (using data-project attribute)
  document.querySelectorAll('.project-item[data-project]').forEach((card) => {
    const projectKey = card.dataset.project;
    if (projects[projectKey]) {
      card.classList.add('project-card-clickable');
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