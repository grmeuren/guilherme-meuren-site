// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Form submission to WhatsApp
document.querySelector('.contato-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const interesse = document.getElementById('interesse').value;
    const mensagem = document.getElementById('mensagem').value;
    
    const whatsappMessage = `Olá! Meu nome é ${nome}.
    
📧 Email: ${email}
📱 Telefone: ${telefone}
🎯 Interesse: ${interesse}

💬 Mensagem: ${mensagem}

Gostaria de mais informações sobre imóveis de alto padrão.`;
    
    const whatsappURL = `https://wa.me/5583993030057?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, '_blank');
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.empreendimento-card, .stat-card, .localizacao-card, .investimento-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.dataset.suffix || '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.dataset.suffix || '');
        }
    }
    
    updateCounter();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            const number = parseFloat(text.replace(/[^\d.]/g, ''));
            const suffix = text.replace(/[\d.]/g, '');
            
            statNumber.dataset.suffix = suffix;
            statNumber.textContent = '0' + suffix;
            
            setTimeout(() => {
                animateCounter(statNumber, number);
            }, 200);
            
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (scrollButton) {
        if (window.scrollY > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    }
});

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    preloadImages();
    
    // Add loading class to body
    document.body.classList.add('loaded');
});

// Performance optimization
window.addEventListener('load', function() {
    // Remove any loading states
    document.body.classList.remove('loading');
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'https://via.placeholder.com/400x250/34495e/ffffff?text=Imagem+Indisponível';
    });
});
