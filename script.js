// ===== Mobile tab menu toggle =====
const menuToggle = document.querySelector('.menu-toggle');
const tabbar = document.querySelector('.tabbar');

menuToggle.addEventListener('click', () => {
    tabbar.classList.toggle('expanded');
});

// ===== Active tab on scroll =====
const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('main section[id]');

window.addEventListener('scroll', () => {
    let current = 'home';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    tabs.forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('href') === `#${current}`);
    });
});

// Close mobile menu after choosing a tab
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabbar.classList.remove('expanded');
    });
});

// ===== Scroll reveal =====
const revealTargets = document.querySelectorAll(
    '.section-head, .about-text, .skill-card, .project-card, .contact-grid > *'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

// ===== Auto-scroll the live site preview when it comes into view =====
const projectVisual = document.querySelector('.project-visual');
if (projectVisual) {
    const previewObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            projectVisual.classList.toggle('in-view', entry.isIntersecting);
        });
    }, { threshold: 0.4 });

    previewObserver.observe(projectVisual);
}

// ===== Contact form (Formspree) =====
const form = document.getElementById('portfolio-contact-form');
const formNote = document.getElementById('form-note');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.name.value.trim();

    if (!form.checkValidity()) {
        formNote.textContent = 'Please fill in every field.';
        return;
    }

    formNote.textContent = 'Sending...';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            formNote.textContent = `Thanks, ${name} — I'll get back to you soon.`;
            form.reset();
        } else {
            formNote.textContent = 'Something went wrong. Please try emailing me directly.';
        }
    } catch (err) {
        formNote.textContent = 'Something went wrong. Please try emailing me directly.';
        console.error(err);
    }
});