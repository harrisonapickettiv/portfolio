/**
 * Harrison Pickett Portfolio
 * Main JavaScript file
 */

(function() {
  'use strict';

  // ===================================
  // DOM Elements
  // ===================================
  
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const themeToggle = document.getElementById('theme-toggle');
  const typingText = document.querySelector('.typing-text');

  // ===================================
  // Theme Toggle
  // ===================================
  
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }

  // ===================================
  // Navigation
  // ===================================
  
  function handleScroll() {
    // Add scrolled class to nav
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  }

  function closeMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  }

  // ===================================
  // Typing Animation
  // ===================================
  
  function initTypingAnimation() {
    if (!typingText) return;

    const phrases = [
      'Software Developer',
      'Problem Solver',
      'Web Developer',
      'Full Stack Engineer'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      // If word is complete
      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before next word
      }

      setTimeout(type, typingSpeed);
    }

    // Start typing animation after a brief delay
    setTimeout(type, 1000);
  }

  // ===================================
  // Scroll Reveal Animation
  // ===================================
  
  function initScrollReveal() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  }

  // ===================================
  // Smooth Scroll for anchor links
  // ===================================
  
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const navHeight = nav.offsetHeight;
          const targetPosition = targetElement.offsetTop - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Close mobile menu if open
          closeMobileMenu();
        }
      });
    });
  }

  // ===================================
  // Lightbox Gallery
  // ===================================
  
  const lightbox = document.getElementById('lightbox');
  let currentGallery = [];
  let currentIndex = 0;

  function initLightbox() {
    if (!lightbox) return;

    const triggers = document.querySelectorAll('.gallery-trigger');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const overlay = lightbox.querySelector('.lightbox-overlay');

    // Open lightbox when clicking gallery trigger
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const galleryId = trigger.dataset.gallery;
        const galleryData = document.getElementById(`gallery-data-${galleryId}`);
        
        if (galleryData) {
          try {
            const data = JSON.parse(galleryData.textContent);
            currentGallery = data.images;
            currentIndex = 0;
            openLightbox();
          } catch (e) {
            console.error('Error parsing gallery data:', e);
          }
        }
      });
    });

    // Close lightbox
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', closeLightbox);

    // Navigation
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', handleLightboxKeydown);

    // Touch swipe navigation
    lightbox.addEventListener('touchstart', handleTouchStart, { passive: true });
    lightbox.addEventListener('touchend', handleTouchEnd, { passive: true });
  }

  function openLightbox() {
    if (currentGallery.length === 0) return;
    
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxImage() {
    const image = lightbox.querySelector('.lightbox-image');
    const caption = lightbox.querySelector('.lightbox-caption');
    const counter = lightbox.querySelector('.lightbox-counter');

    const currentImage = currentGallery[currentIndex];
    
    image.src = currentImage.src;
    image.alt = currentImage.alt;
    caption.textContent = currentImage.alt;
    counter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
  }

  function showPrevImage() {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightboxImage();
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    updateLightboxImage();
  }

  function handleLightboxKeydown(e) {
    if (!lightbox.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        showPrevImage();
        break;
      case 'ArrowRight':
        showNextImage();
        break;
    }
  }

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  const SWIPE_THRESHOLD = 50;

  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
  }

  function handleTouchEnd(e) {
    if (!lightbox.classList.contains('active')) return;
    
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) {
        showNextImage(); // Swipe left = next
      } else {
        showPrevImage(); // Swipe right = prev
      }
    }
  }

  // ===================================
  // Initialize
  // ===================================
  
  function init() {
    // Initialize theme
    initTheme();

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    themeToggle.addEventListener('click', toggleTheme);
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Initialize features
    initTypingAnimation();
    initScrollReveal();
    initSmoothScroll();
    initLightbox();

    // Initial scroll check
    handleScroll();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
