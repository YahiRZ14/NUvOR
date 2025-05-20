document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const themeSwitch = document.getElementById('theme-switch');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Función para cambiar el tema
    const toggleTheme = () => {
        if (themeSwitch.checked) {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        }
    };

    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        themeSwitch.checked = true;
        body.setAttribute('data-theme', 'light');
    }

    // Event Listeners
    themeSwitch.addEventListener('change', toggleTheme);

    // Menú móvil
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Texto de escritura automática
    const words = [
        'Experiencia Digital Única',
        'Presencia Online Poderosa',
        'Identidad Visual Impactante',
        'Estrategia Digital Efectiva'
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    const typeEffect = () => {
        const currentWord = words[wordIndex];
        const typedWords = document.querySelector('.typed-words');
        
        if (!typedWords) return;
        
        if (isDeleting) {
            typedWords.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedWords.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pausa antes de borrar
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pausa antes de escribir la siguiente palabra
        }
        
        setTimeout(typeEffect, typingSpeed);
    };
    
    // Iniciar efecto de escritura
    typeEffect();

    // Efecto de scroll suave para los enlaces de navegación
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

    // Animación de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos que queremos animar
    document.querySelectorAll('.service-card, .project-card, .team-member, .testimonial-card').forEach(element => {
        observer.observe(element);
    });

    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const formObject = Object.fromEntries(formData);
            
            try {
                // Simulación de envío de formulario
                await new Promise(resolve => setTimeout(resolve, 1000));
                alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
                contactForm.reset();
            } catch (error) {
                alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
            }
        });
    }

    // Efecto cyberpunk en el hero
    const createCyberElement = () => {
        const element = document.createElement('div');
        element.classList.add('cyber-element');
        element.style.left = Math.random() * 100 + 'vw';
        element.style.animationDuration = (Math.random() * 2 + 1) + 's';
        return element;
    };

    const cyberElements = document.querySelector('.cyber-elements');
    if (cyberElements) {
        for (let i = 0; i < 20; i++) {
            cyberElements.appendChild(createCyberElement());
        }
    }

    // Animación de las barras de progreso
    const animateProgressBars = () => {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.setProperty('--progress', `${progress}%`);
        });
    };

    // Observer para las barras de progreso
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observar la sección de tecnologías
    const techSection = document.querySelector('.tech-stack');
    if (techSection) {
        progressObserver.observe(techSection);
    }
}); 