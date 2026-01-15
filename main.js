// Main JavaScript file 
// Handles animations, interactions, and dynamic content

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initScrollAnimations();
    initTypewriter();
    initTextSplitting();
    initProjectFilters();
    initSkillBars();
    initCharts();
    initContactForm();
    initParticles();
    initStatCounters();
    
    console.log('Portfolio initialized successfully!');
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Smooth scroll animations for navigation links
function initScrollAnimations() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Typewriter effect for hero section
function initTypewriter() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        const typed = new Typed('#typed-text', {
            strings: [
                'Transforming Insights into Impact',
                'Building Intelligent Solutions',
                'Unlocking Data Potential',
                'Driving Business Growth',
                'Creating AI-Powered Applications'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            startDelay: 1000,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true
        });
    }
}

// Text splitting animations
function initTextSplitting() {
    // Initialize Splitting.js
    Splitting();
    
    // Animate split text on scroll
    const splitTexts = document.querySelectorAll('[data-splitting]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chars = entry.target.querySelectorAll('.char');
                
                anime({
                    targets: chars,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    delay: anime.stagger(50),
                    duration: 800,
                    easing: 'easeOutExpo'
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    splitTexts.forEach(text => {
        observer.observe(text);
    });
}

// Project filtering functionality
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        anime({
                            targets: card,
                            opacity: [0, 1],
                            scale: [0.8, 1],
                            duration: 600,
                            easing: 'easeOutExpo'
                        });
                    } else {
                        anime({
                            targets: card,
                            opacity: 0,
                            scale: 0.8,
                            duration: 300,
                            easing: 'easeInExpo',
                            complete: () => {
                                card.style.display = 'none';
                            }
                        });
                    }
                });
            });
        });
    }
}

// Animate skill bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                
                anime({
                    targets: entry.target,
                    width: width + '%',
                    duration: 1500,
                    easing: 'easeOutExpo',
                    delay: 200
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize charts
function initCharts() {
    initSkillsChart();
    initSkillsRadar();
    initLearningChart();
}

// Skills bar chart for index page
function initSkillsChart() {
    const chartElement = document.getElementById('skills-chart');
    if (!chartElement) return;
    
    const chart = echarts.init(chartElement);
    
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            max: 100,
            axisLabel: {
                formatter: '{value}%'
            }
        },
        yAxis: {
            type: 'category',
            data: ['Big Data', 'Deep Learning', 'Data Viz', 'SQL & DB', 'ML', 'Python']
        },
        series: [{
            type: 'bar',
            data: [75, 82, 85, 88, 90, 95],
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: '#f6ad55' },
                    { offset: 1, color: '#4fd1c7' }
                ])
            },
            animationDelay: function (idx) {
                return idx * 100;
            }
        }]
    };
    
    chart.setOption(option);
    
    // Animate chart on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                chart.resize();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(chartElement);
}

// Skills radar chart for about page
function initSkillsRadar() {
    const chartElement = document.getElementById('skills-radar');
    if (!chartElement) return;
    
    const chart = echarts.init(chartElement);
    
    const option = {
        tooltip: {},
        radar: {
            indicator: [
                { name: 'Python', max: 100 },
                { name: 'Machine Learning', max: 100 },
                { name: 'Deep Learning', max: 100 },
                { name: 'Data Visualization', max: 100 },
                { name: 'Big Data', max: 100 },
                { name: 'Cloud Platforms', max: 100 },
                { name: 'Statistics', max: 100 },
                { name: 'Business Intelligence', max: 100 }
            ],
            radius: '70%'
        },
        series: [{
            type: 'radar',
            data: [{
                value: [95, 90, 82, 85, 75, 80, 88, 92],
                name: 'Current Skills',
                itemStyle: {
                    color: '#f6ad55'
                },
                areaStyle: {
                    color: 'rgba(246, 173, 85, 0.2)'
                }
            }],
            animationDelay: function (idx) {
                return idx * 100;
            }
        }]
    };
    
    chart.setOption(option);
    
    // Responsive chart
    window.addEventListener('resize', () => {
        chart.resize();
    });
}

// Learning journey chart for about page
function initLearningChart() {
    const chartElement = document.getElementById('learning-chart');
    if (!chartElement) return;
    
    const chart = echarts.init(chartElement);
    
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Technical Skills', 'Domain Knowledge', 'Soft Skills']
        },
        xAxis: {
            type: 'category',
            data: ['2019', '2020', '2021', '2022', '2023', '2024']
        },
        yAxis: {
            type: 'value',
            max: 100
        },
        series: [
            {
                name: 'Technical Skills',
                type: 'line',
                data: [60, 75, 85, 90, 92, 95],
                itemStyle: { color: '#f6ad55' },
                smooth: true
            },
            {
                name: 'Domain Knowledge',
                type: 'line',
                data: [50, 65, 75, 82, 88, 90],
                itemStyle: { color: '#4fd1c7' },
                smooth: true
            },
            {
                name: 'Soft Skills',
                type: 'line',
                data: [70, 75, 80, 85, 88, 92],
                itemStyle: { color: '#1a365d' },
                smooth: true
            }
        ]
    };
    
    chart.setOption(option);
    
    // Responsive chart
    window.addEventListener('resize', () => {
        chart.resize();
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loadingSpinner = submitBtn.querySelector('.loading-spinner');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    // Character counter for message
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            if (count > 900) {
                charCount.style.color = '#dc2626';
            } else if (count > 800) {
                charCount.style.color = '#f59e0b';
            } else {
                charCount.style.color = '#64748b';
            }
        });
    }
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide previous messages
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        loadingSpinner.style.display = 'block';
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            loadingSpinner.style.display = 'none';
            
            // Show success message
            successMessage.style.display = 'block';
            contactForm.reset();
            charCount.textContent = '0';
            
            // Animate success message
            anime({
                targets: successMessage,
                opacity: [0, 1],
                translateY: [-20, 0],
                duration: 500,
                easing: 'easeOutExpo'
            });
            
        }, 2000);
    });
}

// Particle animation for hero background
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Create p5.js sketch for particles
    new p5((p) => {
        let particles = [];
        const numParticles = 50;
        
        p.setup = function() {
            const canvas = p.createCanvas(particlesContainer.offsetWidth, particlesContainer.offsetHeight);
            canvas.parent(particlesContainer);
            
            // Create particles
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-0.5, 0.5),
                    size: p.random(2, 6),
                    opacity: p.random(0.1, 0.3)
                });
            }
        };
        
        p.draw = function() {
            p.clear();
            
            // Update and draw particles
            particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Draw particle
                p.fill(255, 255, 255, particle.opacity * 255);
                p.noStroke();
                p.ellipse(particle.x, particle.y, particle.size);
            });
            
            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(other => {
                    const distance = p.dist(particle.x, particle.y, other.x, other.y);
                    if (distance < 100) {
                        const alpha = p.map(distance, 0, 100, 0.1, 0);
                        p.stroke(255, 255, 255, alpha * 255);
                        p.strokeWeight(1);
                        p.line(particle.x, particle.y, other.x, other.y);
                    }
                });
            });
        };
        
        p.windowResized = function() {
            p.resizeCanvas(particlesContainer.offsetWidth, particlesContainer.offsetHeight);
        };
    });
}

// Animated counters for statistics
function initStatCounters() {
    const statNumbers = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                
                anime({
                    targets: entry.target,
                    innerHTML: [0, target],
                    duration: 2000,
                    easing: 'easeOutExpo',
                    round: 1
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Utility function for smooth animations
function animateOnScroll(selector, animation) {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animation(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Add scroll-triggered animations for project cards
animateOnScroll('.project-card', (element) => {
    anime({
        targets: element,
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 800,
        easing: 'easeOutExpo',
        delay: anime.stagger(100)
    });
});

// Add scroll-triggered animations for contact cards
animateOnScroll('.contact-card', (element) => {
    anime({
        targets: element,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        easing: 'easeOutExpo'
    });
});

// Add scroll-triggered animations for skill categories
animateOnScroll('.skill-category', (element) => {
    anime({
        targets: element,
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 600,
        easing: 'easeOutExpo',
        delay: anime.stagger(100)
    });
});

// Add scroll-triggered animations for timeline items
animateOnScroll('.timeline-item', (element) => {
    anime({
        targets: element,
        opacity: [0, 1],
        translateX: [-50, 0],
        duration: 800,
        easing: 'easeOutExpo'
    });
});

// Add scroll-triggered animations for certification cards
animateOnScroll('.certification-card', (element) => {
    anime({
        targets: element,
        opacity: [0, 1],
        translateX: [30, 0],
        duration: 600,
        easing: 'easeOutExpo',
        delay: anime.stagger(100)
    });
});

// Handle window resize for responsive charts
window.addEventListener('resize', function() {
    // Resize all ECharts instances
    const charts = document.querySelectorAll('[id$="-chart"], [id$="-radar"]');
    charts.forEach(chartElement => {
        const chartInstance = echarts.getInstanceByDom(chartElement);
        if (chartInstance) {
            chartInstance.resize();
        }
    });
});

// Add loading animation for page transitions
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0.8';
});

// Smooth page load animation
window.addEventListener('load', function() {
    anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutExpo'
    });
});