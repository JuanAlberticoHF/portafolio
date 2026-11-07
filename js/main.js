// --- Navigation and Scroll Logic ---
const mainContainer = document.getElementById('main-container');
const header = document.getElementById('header');
const progressBar = document.getElementById('progress-bar');
const navLinks = document.querySelectorAll('.nav-link');

let activeSectionIndex = 0;
const sectionIds = ['inicio', 'sobre-mi', 'skills', 'proyectos', 'formacion', 'contacto'];

// Initial setup for default dark theme icon state
document.addEventListener('DOMContentLoaded', () => {
    updateThemeIcon(document.documentElement.classList.contains('dark'));
});

// Track scrolling in the main container for snapping and progress
mainContainer.addEventListener('scroll', () => {
    const scrollTop = mainContainer.scrollTop;
    const scrollHeight = mainContainer.scrollHeight - mainContainer.clientHeight;
    
    // 1. Update Progress Bar
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${progress}%`;

    // 2. Shrink Header
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // 3. Highlight Active Nav Item
    let currentActiveIndex = 0;
    const sections = document.querySelectorAll('.snap-section');
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        if (scrollTop >= sectionTop - (mainContainer.clientHeight / 2)) {
            currentActiveIndex = index;
        }
    });

    updateActiveNav(currentActiveIndex);
});

// Estas funciones deben estar de forma global
function scrollToSection(id, isLogo = false) {
    if (isLogo) {
        navLinks.forEach(link => {
            link.classList.remove('bg-gray-200', 'dark:bg-gray-800', 'text-brand-blue');
        });
    }
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function toggleNav(id, element) {
    const isActive = element.classList.contains('text-brand-blue');
    if (isActive) {
        scrollToSection('inicio');
    } else {
        scrollToSection(id);
    }
}

function updateActiveNav(index) {
    navLinks.forEach(link => {
        link.classList.remove('bg-gray-200', 'dark:bg-gray-800', 'text-brand-blue');
    });
    if (index > 0 && index <= navLinks.length) {
        navLinks[index - 1].classList.add('bg-gray-200', 'dark:bg-gray-800', 'text-brand-blue');
    }
}

// --- Mobile Navigation Logic ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        const isClosed = mobileMenu.classList.contains('-translate-y-[200%]');
        if (isClosed) {
            mobileMenu.classList.remove('-translate-y-[200%]', 'opacity-0', 'pointer-events-none');
            mobileMenu.classList.add('translate-y-0', 'opacity-100');
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark text-xl"></i>';
        } else {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.remove('translate-y-0', 'opacity-100');
        mobileMenu.classList.add('-translate-y-[200%]', 'opacity-0', 'pointer-events-none');
        if (mobileMenuBtn) mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars text-xl"></i>';
    }
}

function toggleNavMobile(id) {
    scrollToSection(id);
    closeMobileMenu();
}

// --- Theme Toggle Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');
const htmlElement = document.documentElement;

function updateThemeIcon(isDark) {
    if (isDark) {
        iconMoon.classList.add('hidden');
        iconSun.classList.remove('hidden');
    } else {
        iconSun.classList.add('hidden');
        iconMoon.classList.remove('hidden');
    }
}

themeToggleBtn.addEventListener('click', () => {
    const isDark = htmlElement.classList.toggle('dark');
    updateThemeIcon(isDark);
});

// --- Skills Dynamic Logic ---
const skillItems = document.querySelectorAll('.skill-item');
const skillInfoBox = document.getElementById('skill-info-box');
const skillNameDisplay = document.getElementById('skill-name-display');
const skillLevelDisplay = document.getElementById('skill-level-display');
const skillDescDisplay = document.getElementById('skill-desc-display');
const skillIconDisplay = document.getElementById('skill-icon-display');

function updateSkillInfo(item) {
    const name = item.getAttribute('data-name');
    const level = item.getAttribute('data-level');
    const desc = item.getAttribute('data-desc');
    
    skillInfoBox.classList.add('opacity-0');
    
    setTimeout(() => {
        skillNameDisplay.textContent = name;
        skillLevelDisplay.textContent = level;
        skillDescDisplay.textContent = desc;
        
        skillIconDisplay.innerHTML = item.innerHTML;
        
        const selectedIcon = skillIconDisplay.querySelector('img');
        if (selectedIcon instanceof HTMLElement && selectedIcon.tagName === 'IMG') {
            selectedIcon.classList.add('w-16', 'h-16', 'sm:w-20', 'sm:h-20', 'object-contain');
        }

        skillIconDisplay.classList.add('text-brand-blue', 'scale-110');
        skillInfoBox.classList.remove('opacity-0');
    }, 200);
}

skillItems.forEach(item => {
    // Hover event for desktop
    item.addEventListener('mouseenter', () => updateSkillInfo(item));
    
    // Tap/Click event for mobile
    item.addEventListener('click', () => {
        updateSkillInfo(item);
        // Desplazamiento sutil hacia la tarjeta en pantallas pequeñas
        if (window.innerWidth < 1024) {
            setTimeout(() => {
                skillInfoBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 250); // espera brevemente para que empiece la animación
        }
    });
    
    item.addEventListener('mouseleave', () => {
        skillIconDisplay.classList.remove('text-brand-blue', 'scale-110');
    });
});

// --- Form Validation Logic ---
const contactForm = document.getElementById('contact-form');
const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const inputMessage = document.getElementById('message');
const submitBtn = document.getElementById('submit-btn');

const validateForm = () => {
    const nameVal = inputName.value.trim();
    const emailVal = inputEmail.value.trim();
    const messageVal = inputMessage.value.trim();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (nameVal !== '' && messageVal !== '' && emailRegex.test(emailVal)) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
};

inputName.addEventListener('input', validateForm);
inputEmail.addEventListener('input', validateForm);
inputMessage.addEventListener('input', validateForm);

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const box = document.createElement('div');
    box.className = 'fixed bottom-4 right-4 bg-brand-blue text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce-slow text-sm sm:text-base';
    box.innerText = '¡Mensaje simulado enviado con éxito!';
    document.body.appendChild(box);
    
    contactForm.reset();
    validateForm();

    setTimeout(() => {
        box.remove();
    }, 3000);
});

function downloadCV() {
    const rutaCV = 'assets/docs/jahf-cv.pdf';
    const enlace = document.createElement('a');
    enlace.href = rutaCV;
    enlace.download = 'CV_Juan_Alberto_Hernandez.pdf';
    
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}
