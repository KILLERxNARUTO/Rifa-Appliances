// Armadillo Home Warranties - Interactive Core Script

document.addEventListener('DOMContentLoaded', () => {
  // 1. STICKY HEADER & FLOATING BADGE SCROLL VISIBILITY
  const header = document.querySelector('header.global');
  const sideBadge = document.querySelector('.side-cta-badge');
  const globalFooter = document.getElementById('globalFooter');

  function updateScrollElements() {
    if (window.scrollY > 40) {
      header?.classList.add('sticky');
    } else {
      header?.classList.remove('sticky');
    }

    if (sideBadge) {
      if (globalFooter) {
        const footerRect = globalFooter.getBoundingClientRect();
        // Hide badge when footer begins to appear in view (120px buffer before reaching footer)
        if (footerRect.top <= window.innerHeight + 60) {
          sideBadge.classList.add('is-hidden');
        } else {
          sideBadge.classList.remove('is-hidden');
        }
      }
    }
  }

  window.addEventListener('scroll', updateScrollElements, { passive: true });
  window.addEventListener('resize', updateScrollElements, { passive: true });
  updateScrollElements();

  // 2. QUOTE SLIDER (Testimonials)
  const slides = document.querySelectorAll('.mod-slide');
  const prevBtn = document.getElementById('quote-prev');
  const nextBtn = document.getElementById('quote-next');
  let currentSlide = 0;
  let slideTimer = null;

  function goToSlide(index) {
    if (slides.length === 0) return;
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    // Fade out current
    slides[currentSlide].classList.remove('on');

    currentSlide = index;

    // Fade in new
    slides[currentSlide].classList.add('on');

    // Update arrow states
    if (prevBtn) prevBtn.classList.toggle('off', currentSlide === 0);
    if (nextBtn) nextBtn.classList.toggle('off', currentSlide === slides.length - 1);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  function startSlideTimer() {
    slideTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
  }

  function stopSlideTimer() {
    clearInterval(slideTimer);
  }

  const sliderWrap = document.querySelector('.quote-slider-wrap');
  if (sliderWrap) {
    sliderWrap.addEventListener('mouseenter', stopSlideTimer);
    sliderWrap.addEventListener('mouseleave', startSlideTimer);
  }

  if (slides.length > 0) startSlideTimer();


  // 3. OFFERINGS CARDS HOVER & TOGGLE (PRODUCTS & SERVICES SCOPE)
  const offeringCards = document.querySelectorAll('.offering-card');
  offeringCards.forEach(card => {
    const toggleBtn = card.querySelector('.card-learn-toggle');
    const closeBtn = card.querySelector('.close-checklist');

    // Reveal on hovering "View Details" or the card
    card.addEventListener('mouseenter', () => {
      card.classList.add('revealed');
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('revealed');
    });

    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        card.classList.toggle('revealed');
      });

      toggleBtn.addEventListener('mouseenter', () => {
        card.classList.add('revealed');
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.remove('revealed');
      });
    }
  });

  // 4. WHAT IS HOME WARRANTY MODAL
  const modal = document.getElementById('warrantyModal');
  const modalTriggers = document.querySelectorAll('.open-warranty-modal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');

  function openModal() {
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  modalTriggers.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // 5. SERVICE INQUIRY / CALL-BACK FORMS
  const quoteForms = document.querySelectorAll('.quote-form');
  quoteForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const val = input ? input.value.trim() : '';

      if (val.length >= 4) {
        // Confirmation feedback
        alert(`Thank you for reaching out to Rifa Appliances Salem! We have registered your request for: "${val}". Our service desk will contact you shortly, or call us directly at 091503 28675.`);
        input.value = '';

        // Smooth scroll to contact section
        const contactSec = document.getElementById('store-location') || document.getElementById('home-chat');
        if (contactSec) {
          contactSec.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        alert('Please enter your 10-digit mobile number or service requirement.');
      }
    });
  });

  // 6. MOBILE MENU DRAWER
  const mobileToggle = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileClose = document.querySelector('.mobile-drawer-close');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileClose && mobileDrawer) {
    mobileClose.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Close mobile drawer when clicking navigation links inside it
  const mobileNavLinks = document.querySelectorAll('.mobile-drawer a');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer) {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // 7. SECTION 3 QUOTE SLIDER (Trust & Testimonials Top Slider)
  const sec3Quotes = document.querySelectorAll('#testimonials .quote-item');
  const sec3Dots = document.querySelectorAll('#testimonials .slider-dot');
  const sec3Prev = document.querySelector('#testimonials .slider-arrow-btn.prev');
  const sec3Next = document.querySelector('#testimonials .slider-arrow-btn.next');
  let sec3Current = 0;
  let sec3Timer = null;

  function showSec3Quote(idx) {
    if (sec3Quotes.length === 0) return;
    if (idx >= sec3Quotes.length) idx = 0;
    if (idx < 0) idx = sec3Quotes.length - 1;

    sec3Quotes.forEach((q, i) => {
      q.classList.toggle('active', i === idx);
    });
    sec3Dots.forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
    sec3Current = idx;
  }

  if (sec3Prev) {
    sec3Prev.addEventListener('click', () => {
      showSec3Quote(sec3Current - 1);
      resetSec3Timer();
    });
  }
  if (sec3Next) {
    sec3Next.addEventListener('click', () => {
      showSec3Quote(sec3Current + 1);
      resetSec3Timer();
    });
  }
  sec3Dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSec3Quote(i);
      resetSec3Timer();
    });
  });

  function startSec3Timer() {
    sec3Timer = setInterval(() => {
      showSec3Quote(sec3Current + 1);
    }, 5500);
  }
  function resetSec3Timer() {
    clearInterval(sec3Timer);
    startSec3Timer();
  }
  if (sec3Quotes.length > 0) {
    startSec3Timer();
    const sec3Box = document.querySelector('#testimonials .quote-slider-box');
    if (sec3Box) {
      sec3Box.addEventListener('mouseenter', () => clearInterval(sec3Timer));
      sec3Box.addEventListener('mouseleave', startSec3Timer);
    }
  }

  // 8. SCROLL CHOREOGRAPHY & INTERSECTION OBSERVER
  // Cascades and reveals components fluidly as they enter view
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    // Stagger containers
    const staggerContainers = document.querySelectorAll(
      '.offerings-grid, .plans_module_cards, .why-cards-grid, .partners-grid, .comparison-tables-flex, .how-points-list, .footer-main-grid, .modal-comparison-grid'
    );

    staggerContainers.forEach(container => {
      const items = Array.from(container.children);
      items.forEach((item, index) => {
        item.style.setProperty('--stagger', index);
        item.classList.add('cascade-item');
      });
    });

    // Elements to reveal
    const revealTargets = document.querySelectorAll(
      'section, .hero-text, .offerings-header, .comparison-header, .choose-step-header, .why-header, .testimonials-header, .testimonials-landing, .partners-header, .how-container, .green-incentive-box, .big-cta-banner, #home-chat header, .all-plans-include-box'
    );

    revealTargets.forEach(el => {
      if (!el.classList.contains('scroll-reveal')) {
        el.classList.add('scroll-reveal');
      }
    });

    const observerOptions = {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // For container grids, trigger their child items
          const childCascades = entry.target.querySelectorAll('.cascade-item');
          childCascades.forEach(child => {
            child.classList.add('is-visible');
          });
        }
      });
    }, observerOptions);

    revealTargets.forEach(el => revealObserver.observe(el));
    staggerContainers.forEach(el => revealObserver.observe(el));
  } else {
    // If reduced motion or no observer, ensure all visible
    document.querySelectorAll('.scroll-reveal, .cascade-item').forEach(el => {
      el.classList.add('is-visible');
    });
  }

  // 9. INTERACTIVE 3D CARD TILT & SPECULAR SHEEN
  if (!prefersReducedMotion && window.innerWidth > 992) {
    const tiltCards = document.querySelectorAll(
      '.offering-card, .plan_card, .partner-box, .green-incentive-box, .quote-frame'
    );

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Subtle tilt angles (-6 to +6 deg)
        const rotateX = ((centerY - y) / centerY) * 5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
        card.style.setProperty('--mouse-x', `${(x / rect.width * 100).toFixed(1)}%`);
        card.style.setProperty('--mouse-y', `${(y / rect.height * 100).toFixed(1)}%`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });

    // 10. HERO AMBIENT MOUSE PARALLAX
    const heroSection = document.getElementById('home-hero');
    const heroSun = heroSection ? heroSection.querySelector('.sun.part') : null;
    const heroClouds = heroSection ? heroSection.querySelector('.cloud-mover') : null;
    const heroArmadillo = heroSection ? heroSection.querySelector('.armadillo.part[data-num="2"]') : null;

    if (heroSection) {
      let rafId = null;
      heroSection.addEventListener('mousemove', (e) => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const rect = heroSection.getBoundingClientRect();
          const normX = (e.clientX - rect.left) / rect.width - 0.5;
          const normY = (e.clientY - rect.top) / rect.height - 0.5;

          if (heroSun) {
            heroSun.style.transform = `translate3d(${normX * 18}px, ${normY * 12}px, 0)`;
          }
          if (heroClouds) {
            heroClouds.style.transform = `translate3d(${normX * -25}px, 0, 0)`;
          }
          if (heroArmadillo) {
            heroArmadillo.style.transform = `translate3d(${normX * 10}px, ${normY * 6}px, 0)`;
          }
        });
      });

      heroSection.addEventListener('mouseleave', () => {
        if (heroSun) heroSun.style.transform = '';
        if (heroClouds) heroClouds.style.transform = '';
        if (heroArmadillo) heroArmadillo.style.transform = '';
      });
    }
  }

  // 11. BUTTON RIPPLE EFFECT ON CLICK
  const interactiveBtns = document.querySelectorAll('.cta-btn, .button-primary, .box-btn, .button-style-2');
  interactiveBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      const diameter = Math.max(btn.clientWidth, btn.clientHeight);
      const radius = diameter / 2;
      const rect = btn.getBoundingClientRect();

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple-wave');

      const existingRipple = btn.querySelector('.ripple-wave');
      if (existingRipple) {
        existingRipple.remove();
      }

      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });
});
