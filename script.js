/* ============================================= */
/* WOW SALON — Interactive Script                 */
/* Lightweight Vanilla JS                         */
/* ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Navbar Scroll Effect ─────────────────────
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    const handleNavScroll = () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();


    // ─── Mobile Menu ──────────────────────────────
    const hamburger = document.getElementById('navHamburger');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        hamburger.classList.toggle('open');
        mobileOverlay.classList.toggle('open');
        document.body.style.overflow = mobileOverlay.classList.contains('open') ? 'hidden' : '';
    };

    hamburger.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileOverlay.classList.contains('open')) {
                toggleMenu();
            }
        });
    });


    // ─── Active Nav Link on Scroll ────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');

    const highlightNav = () => {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });


    // ─── Service Tabs ─────────────────────────────
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabSlider = document.getElementById('tabSlider');
    const panels = document.querySelectorAll('.service-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;

            // Update active tab
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Move slider
            if (tab === 'women') {
                tabSlider.classList.add('right');
            } else {
                tabSlider.classList.remove('right');
            }

            // Switch panels
            panels.forEach(panel => {
                panel.classList.remove('active');
            });

            const targetPanel = document.getElementById(
                tab === 'men' ? 'panelMen' : 'panelWomen'
            );
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });


    // ─── Staff Sliders ────────────────────────────    //  Staff Slider Auto-Scroll & Drag 
    const staffSlider = document.getElementById('staffSlider');
    if (staffSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let isPaused = false;

        // Auto Scroll
        const speed = 1; // 1px per frame
        const autoScroll = () => {
            if (!isPaused && !isDown) {
                staffSlider.scrollLeft += speed;
                // Infinite loop logic: If scrolled past half (since we duplicated items), reset to 0
                if (staffSlider.scrollLeft >= staffSlider.scrollWidth / 2) {
                    staffSlider.scrollLeft = 0;
                }
            }
            requestAnimationFrame(autoScroll);
        };
        requestAnimationFrame(autoScroll);

        // Pause on interaction
        staffSlider.addEventListener('mouseenter', () => isPaused = true);
        staffSlider.addEventListener('mouseleave', () => isPaused = false);
        staffSlider.addEventListener('touchstart', () => isPaused = true, {passive: true});
        staffSlider.addEventListener('touchend', () => { setTimeout(() => isPaused = false, 2000); });

        // Mouse Drag to Scroll
        staffSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            staffSlider.classList.add('active');
            startX = e.pageX - staffSlider.offsetLeft;
            scrollLeft = staffSlider.scrollLeft;
        });
        staffSlider.addEventListener('mouseleave', () => {
            isDown = false;
            staffSlider.classList.remove('active');
        });
        staffSlider.addEventListener('mouseup', () => {
            isDown = false;
            staffSlider.classList.remove('active');
        });
        staffSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - staffSlider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            staffSlider.scrollLeft = scrollLeft - walk;
        });
    }


    // ─── True Infinite Loop Gallery ─────────────────
    const gallerySlider = document.getElementById('gallerySlider');
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');

    if (gallerySlider) {
        const originalItems = Array.from(gallerySlider.children);
        
        // Clone items for infinite loop (3 full sets to allow scrolling both directions safely)
        originalItems.forEach(item => {
            const cloneEnd = item.cloneNode(true);
            cloneEnd.classList.add('clone-end');
            gallerySlider.appendChild(cloneEnd);
        });
        
        originalItems.forEach(item => {
            const cloneStart = item.cloneNode(true);
            cloneStart.classList.add('clone-start');
            gallerySlider.insertBefore(cloneStart, gallerySlider.firstChild);
        });

        // Calculate the width of one full set of original items
        const getSetWidth = () => {
            const items = Array.from(gallerySlider.children);
            const setLength = originalItems.length;
            if (items.length === 0) return 0;
            const firstOfSet = items[setLength]; // First of middle set
            const lastOfSet = items[setLength * 2 - 1]; // Last of middle set
            const gap = parseFloat(window.getComputedStyle(gallerySlider).gap) || 0;
            return lastOfSet.getBoundingClientRect().right - firstOfSet.getBoundingClientRect().left + gap;
        };

        // Center the gallery on the middle set initially
        let isInitialized = false;
        const initScrollPosition = () => {
            if (isInitialized) return;
            const setWidth = getSetWidth();
            if (setWidth > 0) {
                gallerySlider.scrollLeft = setWidth;
                isInitialized = true;
            }
        };

        // Needs a slight delay for images to render and get actual widths
        setTimeout(initScrollPosition, 100);
        window.addEventListener('resize', () => {
            isInitialized = false;
            setTimeout(initScrollPosition, 100);
        });

        // Quietly jump back to the middle set when scrolling into clones
        const handleInfiniteScroll = () => {
            const setWidth = getSetWidth();
            if (setWidth === 0) return;

            // If we've scrolled into the first (prepended) set
            if (gallerySlider.scrollLeft < setWidth / 2) {
                gallerySlider.style.scrollBehavior = 'auto'; // Disable smooth scroll for instant jump
                gallerySlider.scrollLeft += setWidth;
            } 
            // If we've scrolled into the last (appended) set
            else if (gallerySlider.scrollLeft > setWidth * 1.5) {
                gallerySlider.style.scrollBehavior = 'auto';
                gallerySlider.scrollLeft -= setWidth;
            }
        };

        gallerySlider.addEventListener('scroll', () => {
            // Re-enable smooth behavior if we just jumped
            if (gallerySlider.style.scrollBehavior === 'auto') {
                gallerySlider.style.scrollBehavior = 'smooth';
            }
        });
        
        // We use scrollend (or a timeout fallback) to jump seamlessly when they finish a swipe
        let scrollTimeout;
        gallerySlider.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(handleInfiniteScroll, 150);
        }, { passive: true });


        // Buttons
        const scrollAmount = 350;
        if (galleryPrev) {
            galleryPrev.addEventListener('click', () => {
                gallerySlider.style.scrollBehavior = 'smooth';
                gallerySlider.scrollLeft -= scrollAmount;
            });
        }
        if (galleryNext) {
            galleryNext.addEventListener('click', () => {
                gallerySlider.style.scrollBehavior = 'smooth';
                gallerySlider.scrollLeft += scrollAmount;
            });
        }

        // Generic Mouse Drag Support
        let isDown = false;
        let startX;
        let scrollLeft;

        gallerySlider.addEventListener('mousedown', (e) => {
            isDown = true;
            gallerySlider.style.cursor = 'grabbing';
            gallerySlider.style.scrollBehavior = 'auto';
            gallerySlider.style.scrollSnapType = 'none';
            startX = e.pageX - gallerySlider.offsetLeft;
            scrollLeft = gallerySlider.scrollLeft;
        });
        gallerySlider.addEventListener('mouseleave', () => {
            isDown = false;
            gallerySlider.style.cursor = '';
            gallerySlider.style.scrollSnapType = 'x mandatory';
        });
        gallerySlider.addEventListener('mouseup', () => {
            isDown = false;
            gallerySlider.style.cursor = '';
            gallerySlider.style.scrollSnapType = 'x mandatory';
            handleInfiniteScroll();
        });
        gallerySlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - gallerySlider.offsetLeft;
            const walk = (x - startX) * 2;
            gallerySlider.scrollLeft = scrollLeft - walk;
        });
    }

    // ─── Gallery Lightbox ─────────────────────────
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    if (lightbox && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightbox.classList.add('active');
                }
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
            }
        });
    }

    // ─── Cinematic Services Swipe Engine ──────────
    const servicesCarousels = document.querySelectorAll('.services-carousel');
    
    // 1. Generic Drag to Scroll
    const makeDraggable = (slider) => {
        if (!slider) return;
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            slider.style.cursor = 'grabbing';
            slider.style.scrollSnapType = 'none';
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = '';
            slider.style.scrollSnapType = 'x mandatory'; 
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = '';
            slider.style.scrollSnapType = 'x mandatory'; 
        });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    };

    servicesCarousels.forEach(carousel => makeDraggable(carousel));

    // 2. Cinematic Intersection Tracking
    if ('IntersectionObserver' in window) {
        const cinematicObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    
                    // Ignore if already focused
                    if (card.classList.contains('focused')) return;
                    
                    // Remove focus from siblings
                    const parentCarousel = card.closest('.services-carousel');
                    if (parentCarousel) {
                        const siblings = parentCarousel.querySelectorAll('.service-card');
                        siblings.forEach(s => {
                            s.classList.remove('focused');
                            const content = s.querySelector('.card-content');
                            if (content) content.classList.remove('show-overlay');
                        });
                    }

                    // Add focus to centered card
                    card.classList.add('focused');
                    const content = card.querySelector('.card-content');
                    
                    if (content) {
                        // Clear existing timeout
                        if (content.hideTimeout) clearTimeout(content.hideTimeout);
                        
                        // Show overlay
                        content.classList.add('show-overlay');
                        
                        // Auto-hide after 2.5 seconds
                        content.hideTimeout = setTimeout(() => {
                            content.classList.remove('show-overlay');
                        }, 2500);
                    }
                }
            });
        }, {
            root: null, // use viewport (can't easily use carousel itself due to mobile/desktop differences)
            rootMargin: '0px',
            threshold: 0.8 // triggered when 80% of card is visible
        });

        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            cinematicObserver.observe(card);
        });
    }

    // ─── Before / After Slider ────────────────────
    const baContainers = document.querySelectorAll('.ba-slider-container');

    baContainers.forEach(container => {
        const beforeEl = container.querySelector('.ba-before');
        const handle = container.querySelector('.ba-handle');
        let isDragging = false;

        const updatePosition = (clientX) => {
            const rect = container.getBoundingClientRect();
            let x = clientX - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            const percent = (x / rect.width) * 100;

            beforeEl.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
            handle.style.left = `${percent}%`;
        };

        // Mouse events
        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            updatePosition(e.clientX);
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                updatePosition(e.clientX);
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Touch events
        container.addEventListener('touchstart', (e) => {
            isDragging = true;
            updatePosition(e.touches[0].clientX);
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            if (isDragging) {
                updatePosition(e.touches[0].clientX);
                e.preventDefault();
            }
        }, { passive: false });

        container.addEventListener('touchend', () => {
            isDragging = false;
        });
    });


    // ─── Scroll Reveal (Intersection Observer) ────
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback: show everything immediately
        revealElements.forEach(el => el.classList.add('revealed'));
    }


    // ─── Animated Stat Counters ───────────────────
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => counterObserver.observe(el));
    }

    function animateCounter(el) {
        const target = parseInt(el.dataset.count, 10);
        const duration = 2000;
        const startTime = performance.now();

        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

        function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const current = Math.round(easedProgress * target);

            el.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        }

        requestAnimationFrame(tick);
    }


    // ─── Immersive 3D Scene Parallax ─────────────
    const heroScene = document.getElementById('heroScene');
    const scenePerspective = document.querySelector('.scene-perspective');
    const sceneLayers = document.querySelectorAll('.scene-layer');

    if (heroScene && scenePerspective && sceneLayers.length > 0) {
        // Mouse-driven 3D parallax
        heroScene.addEventListener('mousemove', (e) => {
            const rect = heroScene.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            // Rotate the whole perspective container subtly
            scenePerspective.style.transform =
                `rotateY(${x * 6}deg) rotateX(${y * -4}deg)`;

            // Move each layer at its own depth
            sceneLayers.forEach(layer => {
                const depth = parseFloat(layer.getAttribute('data-depth')) || 0;
                const moveX = x * depth * 600;
                const moveY = y * depth * 400;
                layer.style.transform =
                    `translate3d(${moveX}px, ${moveY}px, ${depth * 100}px)`;
            });
        });

        heroScene.addEventListener('mouseleave', () => {
            scenePerspective.style.transform = 'rotateY(0) rotateX(0)';
            sceneLayers.forEach(layer => {
                layer.style.transform = 'translate3d(0, 0, 0)';
            });
        });

        // Touch parallax via device orientation (mobile)
        if (window.DeviceOrientationEvent && 'ontouchstart' in window) {
            window.addEventListener('deviceorientation', (e) => {
                if (e.gamma === null || e.beta === null) return;
                const x = Math.max(-30, Math.min(30, e.gamma)) / 60; // -0.5 to 0.5
                const y = Math.max(-30, Math.min(30, e.beta - 45)) / 60;

                scenePerspective.style.transform =
                    `rotateY(${x * 4}deg) rotateX(${y * -3}deg)`;

                sceneLayers.forEach(layer => {
                    const depth = parseFloat(layer.getAttribute('data-depth')) || 0;
                    layer.style.transform =
                        `translate3d(${x * depth * 400}px, ${y * depth * 300}px, 0)`;
                });
            }, { passive: true });
        }
    }

    // ─── Smooth scroll for all anchor links ───────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPos = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ─── Swipe Hint Micro-interaction ─────────────
    const swipeHint = document.getElementById('swipeHint');
    const servicesSection = document.getElementById('services');
    let swipeHintShown = false;

    if (swipeHint && servicesSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !swipeHintShown) {
                swipeHintShown = true;
                setTimeout(() => {
                    swipeHint.classList.add('visible');
                    
                    setTimeout(() => {
                        swipeHint.classList.remove('visible');
                    }, 4000);
                }, 500);
            }
        }, { threshold: 0.3 });
        
        observer.observe(servicesSection);

        const hideHint = () => {
            if (swipeHint.classList.contains('visible')) {
                swipeHint.classList.remove('visible');
            }
        };

        const carousels = servicesSection.querySelectorAll('.services-carousel');
        let hintTimer;

        carousels.forEach(c => {
            c.addEventListener('scroll', () => {
                hideHint();
                clearTimeout(hintTimer);
                
                // Re-show if scrolled back to start
                if (c.scrollLeft <= 10) {
                    hintTimer = setTimeout(() => {
                        swipeHint.classList.add('visible');
                        setTimeout(hideHint, 3000);
                    }, 800);
                }
            });
            c.addEventListener('mousedown', hideHint);
            c.addEventListener('touchstart', hideHint);
        });
    }

});
