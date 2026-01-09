document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initParallax();
    init3DTilt();
});

/* =========================================
   Particle System
   ========================================= */
function initParticles() {
    const particleLayer = document.createElement('div');
    particleLayer.className = 'particle-layer';
    document.body.appendChild(particleLayer);

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particleLayer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random Properties
    const size = Math.random() * 3 + 1; // 1px to 4px
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 10; // 10s to 30s
    const delay = Math.random() * 5;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}vw`;
    particle.style.top = `${y}vh`;
    particle.style.animation = `float-orb ${duration}s infinite linear ${delay}s`;
    particle.style.opacity = Math.random() * 0.3 + 0.1;

    container.appendChild(particle);
}

/* =========================================
   Mouse Parallax (Global)
   ========================================= */
function initParallax() {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
        const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1

        document.documentElement.style.setProperty('--mouse-x', x);
        document.documentElement.style.setProperty('--mouse-y', y);

        // Optional: Direct parallax for background orbs
        const orbs = document.querySelectorAll('.orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20; // varying speeds
            orb.style.transform = `translate(${x * speed}px, ${y * speed}px) scale(1.1)`;
        });
    });
}

/* =========================================
   3D Card Tilt Effect
   ========================================= */
function init3DTilt() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mousemove', handleHover);
        card.addEventListener('mouseleave', resetCard);
    });
}

function handleHover(e) {
    const card = this;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation (max 15 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Y rotate (left/right tilt) - Depends on X pos
    const rotateY = ((x - centerX) / centerX) * 10;

    // X rotate (up/down tilt) - Depends on Y pos (inverted)
    const rotateX = ((centerY - y) / centerY) * 10;

    // Apply Style
    card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale3d(1.02, 1.02, 1.02)
    `;

    // Shine Effect Position
    // We can update a gradient variable if we want dynamic shine direction
    // For now, simpler tilt is enough, but let's try updating background pos if possible
}

function resetCard() {
    this.style.transform = `
        perspective(1000px) 
        rotateX(0deg) 
        rotateY(0deg) 
        scale3d(1, 1, 1)
    `;
}

/* =========================================
   Terms Modal Controls
   ========================================= */
const DOWNLOAD_URL = 'https://github.com/Cajuut/Prismarine-updater/releases/download/v.1/PrismarineLauncher.exe';

function openTermsModal() {
    const modal = document.getElementById('termsModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeTermsModal() {
    const modal = document.getElementById('termsModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

function agreeAndDownload() {
    // Close the modal
    closeTermsModal();

    // Start download
    window.location.href = DOWNLOAD_URL;
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('termsModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeTermsModal();
            }
        });
    }
});
