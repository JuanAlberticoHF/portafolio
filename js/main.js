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

// Estas funciones deben estar de forma global, NO las envuelvas en un DOMContentLoaded
// porque el HTML hace uso de ellas directamente en sus atributos onclick.
function scrollToSection(id, isLogo = false) {
    if (isLogo) {
        // If logo is clicked, deselect active nav and go to inicio
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
        // Deselecting active element -> go to inicio
        scrollToSection('inicio');
    } else {
        // Selecting new element
        scrollToSection(id);
    }
}

function updateActiveNav(index) {
    navLinks.forEach(link => {
        link.classList.remove('bg-gray-200', 'dark:bg-gray-800', 'text-brand-blue');
    });
    // section 0 is inicio (no nav button), so map nav links to index 1-5
    if (index > 0 && index <= navLinks.length) {
        navLinks[index - 1].classList.add('bg-gray-200', 'dark:bg-gray-800', 'text-brand-blue');
    }
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

// --- Skills Hover Logic ---
const skillItems = document.querySelectorAll('.skill-item');
const skillInfoBox = document.getElementById('skill-info-box');
const skillNameDisplay = document.getElementById('skill-name-display');
const skillLevelDisplay = document.getElementById('skill-level-display');
const skillDescDisplay = document.getElementById('skill-desc-display');
const skillIconDisplay = document.getElementById('skill-icon-display');

skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const name = item.getAttribute('data-name');
        const level = item.getAttribute('data-level');
        const desc = item.getAttribute('data-desc');
        
        // Animación de opacidad al cambiar
        skillInfoBox.classList.add('opacity-0');
        
        setTimeout(() => {
            skillNameDisplay.textContent = name;
            skillLevelDisplay.textContent = level;
            skillDescDisplay.textContent = desc;
            
            // Copy the icon HTML
            skillIconDisplay.innerHTML = item.innerHTML;
            
            // Increase only the selected icon, keeping the container size unchanged
            const selectedIcon = skillIconDisplay.querySelector('img');
            if (selectedIcon instanceof HTMLElement) {
                if (selectedIcon.tagName === 'IMG') {
                    selectedIcon.classList.add('w-24', 'h-24', 'object-contain');
                }
            }

            // Add pop animation class to the icon inside
            skillIconDisplay.classList.add('text-brand-blue', 'scale-110');
            
            // Mostrar de nuevo
            skillInfoBox.classList.remove('opacity-0');
        }, 200);
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
    
    // Basic email regex mapping an "@" requirement correctly
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
    // Create a custom message box instead of alert()
    const box = document.createElement('div');
    box.className = 'fixed bottom-4 right-4 bg-brand-blue text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce-slow';
    box.innerText = '¡Mensaje simulado enviado con éxito!';
    document.body.appendChild(box);
    
    // Reset form
    contactForm.reset();
    validateForm();

    setTimeout(() => {
        box.remove();
    }, 3000);
});

function downloadCV() {
    // 1. Ruta del archivo
    const rutaCV = 'assets/docs/jahf-cv.pdf';
    
    // 2. Crear un elemento <a> invisible en memoria
    const enlace = document.createElement('a');
    enlace.href = rutaCV;
    enlace.download = 'CV_Juan_Alberto_Hernandez.pdf'; // Nombre con el que se descargará
    
    // 3. Añadirlo temporalmente al documento y simular el clic
    document.body.appendChild(enlace);
    enlace.click();
    
    // 4. Limpiar el elemento creado
    document.body.removeChild(enlace);
}
