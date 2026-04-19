/* ------------------------------------------------------------
   Dr. Davhana MG - General Practitioner Website
   File: script.js (FULLY UPDATED)
   Description: Complete JavaScript functionality for all pages including:
   - Mobile navigation toggle (FIXED)
   - Smooth scrolling for all anchor links
   - Appointment booking form with validation & confirmation
   - Contact form with email simulation & validation
   - FAQ accordion functionality
   - Newsletter subscription
   - Active nav link highlighting on scroll
   - WhatsApp chat integration
   - Animated skill bars (About page)
   - Scroll to top button
   - Touch-friendly mobile interactions
   - Qualification cards animation
   - Course items hover effects
   ------------------------------------------------------------ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. MOBILE NAVIGATION MENU TOGGLE (FIXED)
    // ============================================
    const burgerMenu = document.getElementById('burgerMenu');
    const navLinks = document.getElementById('navLinks');
    
    if (burgerMenu && navLinks) {
        // Toggle menu when burger icon is clicked
        burgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            
            // Change burger icon to X when open, back to bars when closed
            const icon = burgerMenu.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                // Prevent body scroll when menu is open on mobile
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on any nav link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const icon = burgerMenu.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside on mobile
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 768) {
                if (!burgerMenu.contains(event.target) && !navLinks.contains(event.target)) {
                    navLinks.classList.remove('active');
                    const icon = burgerMenu.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    document.body.style.overflow = '';
                }
            }
        });
        
        // Handle window resize - reset menu state if screen becomes larger
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                const icon = burgerMenu.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ============================================
    // 2. SMOOTH SCROLLING FOR ALL ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // 3. APPOINTMENT BOOKING FORM WITH VALIDATION
    // ============================================
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const fullName = document.getElementById('fullName');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const appDate = document.getElementById('appDate');
            const appTime = document.getElementById('appTime');
            const reason = document.getElementById('reason');
            
            // Get error message elements
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const phoneError = document.getElementById('phoneError');
            const dateError = document.getElementById('dateError');
            const timeError = document.getElementById('timeError');
            const confirmationMsg = document.getElementById('confirmationMsg');
            
            // Reset all error messages
            if (nameError) nameError.style.display = 'none';
            if (emailError) emailError.style.display = 'none';
            if (phoneError) phoneError.style.display = 'none';
            if (dateError) dateError.style.display = 'none';
            if (timeError) timeError.style.display = 'none';
            
            let isValid = true;
            
            // Validate Full Name
            if (!fullName.value.trim()) {
                if (nameError) nameError.style.display = 'block';
                isValid = false;
            }
            
            // Validate Email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailPattern.test(email.value)) {
                if (emailError) emailError.style.display = 'block';
                isValid = false;
            }
            
            // Validate Phone
            if (!phone.value.trim()) {
                if (phoneError) phoneError.style.display = 'block';
                isValid = false;
            }
            
            // Validate Date
            if (!appDate.value) {
                if (dateError) dateError.style.display = 'block';
                isValid = false;
            }
            
            // Validate Time
            if (!appTime.value) {
                if (timeError) timeError.style.display = 'block';
                isValid = false;
            }
            
            // If valid, show confirmation
            if (isValid) {
                const formattedDate = new Date(appDate.value).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                
                if (confirmationMsg) {
                    confirmationMsg.style.display = 'block';
                    confirmationMsg.innerHTML = `
                        <i class="fas fa-check-circle" style="margin-right: 10px; font-size: 1.2rem;"></i>
                        <strong>Appointment Confirmed!</strong><br>
                        Thank you ${fullName.value.trim()}! Your appointment has been scheduled for ${formattedDate} at ${appTime.value}.<br>
                        A confirmation email has been sent to ${email.value}.<br>
                        <small style="display: inline-block; margin-top: 8px;">Reference: DR${Math.floor(Math.random() * 10000)}</small>
                    `;
                }
                
                // Log appointment data (simulates sending to server)
                console.log('Appointment booked:', {
                    name: fullName.value,
                    email: email.value,
                    phone: phone.value,
                    date: appDate.value,
                    time: appTime.value,
                    reason: reason ? reason.value : ''
                });
                
                // Reset form after 1 second
                setTimeout(() => {
                    bookingForm.reset();
                    setTimeout(() => {
                        if (confirmationMsg) confirmationMsg.style.display = 'none';
                    }, 5000);
                }, 1000);
            }
        });
    }
    
    // ============================================
    // 4. CONTACT FORM WITH EMAIL SIMULATION
    // ============================================
    const contactForm = document.getElementById('contactFormEmail');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const contactName = document.getElementById('contactName');
            const contactEmail = document.getElementById('contactEmail');
            const contactMsg = document.getElementById('contactMsg');
            const statusDiv = document.getElementById('contactFormStatus');
            
            // Simple validation
            if (!contactName.value.trim() || !contactEmail.value.trim() || !contactMsg.value.trim()) {
                if (statusDiv) {
                    statusDiv.style.display = 'block';
                    statusDiv.style.background = '#f8d7da';
                    statusDiv.style.color = '#721c24';
                    statusDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please fill in all fields.';
                }
                
                setTimeout(() => {
                    if (statusDiv) statusDiv.style.display = 'none';
                }, 3000);
                return;
            }
            
            // Email format validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(contactEmail.value)) {
                if (statusDiv) {
                    statusDiv.style.display = 'block';
                    statusDiv.style.background = '#f8d7da';
                    statusDiv.style.color = '#721c24';
                    statusDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please enter a valid email address.';
                }
                
                setTimeout(() => {
                    if (statusDiv) statusDiv.style.display = 'none';
                }, 3000);
                return;
            }
            
            // Success message
            if (statusDiv) {
                statusDiv.style.display = 'block';
                statusDiv.style.background = '#d1e7dd';
                statusDiv.style.color = '#0f5132';
                statusDiv.innerHTML = `<i class="fas fa-check-circle"></i> Thank you ${contactName.value}! Your message has been sent. We'll respond within 24 hours.`;
            }
            
            // Log contact form data
            console.log('Contact form submitted:', {
                name: contactName.value,
                email: contactEmail.value,
                message: contactMsg.value
            });
            
            // Reset form
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                if (statusDiv) statusDiv.style.display = 'none';
            }, 5000);
        });
    }
    
    // ============================================
    // 5. FAQ ACCORDION FUNCTIONALITY
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question ? question.querySelector('i') : null;
        
        if (question && answer) {
            // Set initial state
            answer.style.display = 'none';
            if (icon) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
            
            question.addEventListener('click', function() {
                // Toggle current answer
                const isOpen = answer.style.display === 'block';
                
                // Close all other FAQs (accordion behavior)
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-question i');
                    if (otherAnswer && otherAnswer !== answer) {
                        otherAnswer.style.display = 'none';
                        if (otherIcon) {
                            otherIcon.classList.remove('fa-chevron-up');
                            otherIcon.classList.add('fa-chevron-down');
                        }
                    }
                });
                
                // Toggle current
                if (isOpen) {
                    answer.style.display = 'none';
                    if (icon) {
                        icon.classList.remove('fa-chevron-up');
                        icon.classList.add('fa-chevron-down');
                    }
                } else {
                    answer.style.display = 'block';
                    if (icon) {
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-chevron-up');
                    }
                }
            });
        }
    });
    
    // ============================================
    // 6. NEWSLETTER SUBSCRIPTION
    // ============================================
    const newsEmail = document.getElementById('newsEmail');
    const subscribeBtn = document.querySelector('.footer-col button');
    
    if (subscribeBtn && newsEmail) {
        subscribeBtn.addEventListener('click', function() {
            const email = newsEmail.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                showNotification('Please enter your email address', 'error');
            } else if (!emailPattern.test(email)) {
                showNotification('Please enter a valid email address', 'error');
            } else {
                showNotification(`Thank you for subscribing! Health tips will be sent to ${email}`, 'success');
                newsEmail.value = '';
            }
        });
    }
    
    // Notification helper function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#d1e7dd' : '#f8d7da'};
            color: ${type === 'success' ? '#0f5132' : '#721c24'};
            border-radius: 8px;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideInRight 0.3s ease;
            font-weight: 500;
        `;
        notification.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i> ${message}`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Add notification animations
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(notificationStyle);
    
    // ============================================
    // 7. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navItemsAll = document.querySelectorAll('.nav-links a');
    
    function updateActiveNavLink() {
        let current = '';
        const scrollPosition = window.scrollY + 120;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItemsAll.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href && href.substring(1) === current) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
    
    // ============================================
    // 8. ANIMATED SKILL BARS (ABOUT PAGE)
    // ============================================
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;
    
    function animateSkills() {
        if (skillsAnimated) return;
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (width) {
                const barPosition = bar.getBoundingClientRect().top;
                const screenPosition = window.innerHeight;
                
                if (barPosition < screenPosition) {
                    bar.style.width = width + '%';
                    skillsAnimated = true;
                }
            }
        });
    }
    
    window.addEventListener('scroll', animateSkills);
    animateSkills();
    
    // ============================================
    // 9. QUALIFICATION CARDS ANIMATION ON SCROLL
    // ============================================
    const qualificationCards = document.querySelectorAll('.qualification-card');
    
    function animateCards() {
        qualificationCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (cardPosition < screenPosition) {
                card.style.animation = `slideIn 0.5s ease-out forwards`;
                card.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }
    
    window.addEventListener('scroll', animateCards);
    animateCards();
    
    // ============================================
    // 10. COURSE ITEMS HOVER EFFECT
    // ============================================
    const courseItems = document.querySelectorAll('.course-item');
    courseItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // ============================================
    // 11. EXPERIENCE CARDS STAGGERED ANIMATION
    // ============================================
    const experienceCards = document.querySelectorAll('.experience-card');
    
    function animateExperienceCards() {
        experienceCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    experienceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';
    });
    
    window.addEventListener('scroll', animateExperienceCards);
    animateExperienceCards();
    
    // ============================================
    // 12. MEMBERSHIP CARDS HOVER EFFECT
    // ============================================
    const membershipCards = document.querySelectorAll('.membership-card');
    membershipCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ============================================
    // 13. STAT CARDS COUNTER ANIMATION
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.innerText);
            if (target) {
                const statPosition = stat.getBoundingClientRect().top;
                const screenPosition = window.innerHeight;
                
                if (statPosition < screenPosition) {
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.innerText = target;
                            clearInterval(timer);
                        } else {
                            stat.innerText = Math.floor(current);
                        }
                    }, 20);
                    statsAnimated = true;
                }
            }
        });
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats();
    
    // ============================================
    // 14. DOWNLOAD BUTTON HANDLERS
    // ============================================
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const formName = this.textContent.trim();
            showNotification(`Demo: ${formName} would download here.`, 'info');
            console.log('Download requested:', formName);
        });
    });
    
    // ============================================
    // 15. SOCIAL MEDIA LINKS HANDLERS
    // ============================================
    const socialLinks = document.querySelectorAll('.social-icons a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Demo: Social media profiles would open here.', 'info');
        });
    });
    
    // ============================================
    // 16. WHATSAPP CHAT INTEGRATION
    // ============================================
    const whatsappBtn = document.querySelector('.whatsapp-chat');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            console.log('WhatsApp chat opened - connecting to Dr. Davhana');
        });
    }
    
    // ============================================
    // 17. SCROLL TO TOP BUTTON
    // ============================================
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 25px;
        width: 50px;
        height: 50px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollTopBtn.addEventListener('mouseenter', function() {
        scrollTopBtn.style.background = 'var(--primary-dark)';
        scrollTopBtn.style.transform = 'scale(1.1)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        scrollTopBtn.style.background = 'var(--primary)';
        scrollTopBtn.style.transform = 'scale(1)';
    });
    
    // ============================================
    // 18. PREVENT ACCIDENTAL FORM SUBMISSION ON ENTER
    // ============================================
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.type !== 'submit') {
                e.preventDefault();
                return false;
            }
        });
    });
    
    // ============================================
    // 19. GOOGLE MAPS ACCESSIBILITY
    // ============================================
    const mapFrame = document.querySelector('.map-container iframe');
    if (mapFrame) {
        mapFrame.setAttribute('title', 'Google Map showing Dr. Davhana MG clinic location at 123 Medipark Square, Pretoria, South Africa');
    }
    
    // ============================================
    // 20. PARALLAX EFFECT FOR HERO SECTION
    // ============================================
    const heroSection = document.querySelector('.hero');
    if (heroSection && window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
        });
    }
    
    // ============================================
    // 21. ADD TOUCH-FRIENDLY CLASS FOR MOBILE
    // ============================================
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        const allButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .download-btn, .whatsapp-chat, .nav-links a');
        allButtons.forEach(btn => {
            btn.style.cursor = 'pointer';
        });
    }
    
    // ============================================
    // 22. ADD STYLES FOR ACTIVE NAV LINK & ANIMATIONS
    // ============================================
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        .nav-links li a.active {
            color: var(--primary);
            font-weight: 700;
            border-bottom: 2px solid var(--primary);
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .qualification-card {
            opacity: 0;
            animation: slideIn 0.5s ease-out forwards;
        }
        
        @media (max-width: 768px) {
            .nav-links li a.active {
                border-bottom: none;
                color: var(--primary);
            }
            
            .scroll-top-btn {
                bottom: 80px;
                right: 15px;
                width: 40px;
                height: 40px;
                font-size: 1rem;
            }
        }
        
        @media (min-width: 769px) {
            .burger {
                display: none;
            }
            
            .nav-links {
                display: flex !important;
                position: static;
                width: auto;
                height: auto;
                background: transparent;
                padding: 0;
                flex-direction: row;
                gap: 1.8rem;
                box-shadow: none;
                overflow: visible;
            }
        }
        
        .stat-number {
            transition: all 0.5s ease;
        }
        
        .course-item {
            transition: transform 0.3s ease;
        }
        
        .membership-card {
            transition: all 0.3s ease;
        }
        
        .experience-card {
            transition: all 0.5s ease;
        }
    `;
    document.head.appendChild(dynamicStyles);
    
    // ============================================
    // 23. INITIALIZATION COMPLETE
    // ============================================
    console.log('Dr. Davhana MG Website - Fully Loaded and Interactive!');
    console.log('Features:');
    console.log('✓ Mobile Navigation');
    console.log('✓ Smooth Scrolling');
    console.log('✓ Form Validation');
    console.log('✓ FAQ Accordion');
    console.log('✓ Animated Skill Bars');
    console.log('✓ Counter Animation');
    console.log('✓ WhatsApp Integration');
    console.log('✓ Scroll to Top Button');
    console.log('✓ Touch-Friendly Interactions');
});