// 1) Load particles.js
particlesJS.load('particles-js', 'assets/particles.json', () => {
    console.log('particles.js loaded');
});

// 2) Initialize AOS
AOS.init({ duration: 800, once: true });

// 3) Typed.js Hero Text
new Typed('#typed', {
    strings: ['AI Developer', 'ML Engineer'],
    typeSpeed: 80,
    backSpeed: 40,
    loop: true
});

// 4) Vanilla Tilt on cards
document.querySelectorAll('[data-tilt]').forEach(el => {
    VanillaTilt.init(el, {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.2
    });
});

// 5) Contact form via Formspree
const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');

contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
    }
    try {
        const resp = await fetch('https://formspree.io/f/xzzgbnpz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });
        if (resp.ok) {
            contactForm.reset();
            contactSuccess.style.display = 'block';
            setTimeout(() => contactSuccess.style.display = 'none', 5000);
        } else {
            throw new Error('Formspree error');
        }
    } catch (err) {
        console.error(err);
        alert('Oops! Something went wrong.');
    }
});

// 6) Chat widget logic
const chatToggle = document.querySelector('.chat-toggle');
const chatWidget = document.querySelector('.chat-widget');
const chatClose = document.querySelector('.chat-close');
const chatBody = document.querySelector('.chat-body');
const chatInput = document.querySelector('.chat-input');
const chatSend = document.querySelector('.chat-send');

chatToggle.addEventListener('click', () => {
    chatWidget.classList.toggle('open');
    chatInput.focus();
});
chatClose.addEventListener('click', () => chatWidget.classList.remove('open'));

function appendMessage(text, sender = 'bot') {
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
}

chatSend.addEventListener('click', () => {
    const text = chatInput.value.trim();
    if (!text) return;
    appendMessage(text, 'user');
    chatInput.value = '';
    const lower = text.toLowerCase();
    let reply;
    if (lower.includes('skill')) {
        reply = 'I have strong skills in: Java, Python, SQL; frameworks & libraries like TensorFlow, PyTorch, Keras, OpenCV, Pandas, NumPy, Spring Boot, Flask, LangChain, Streamlit, RAG; web tech (HTML, CSS, Angular, React, Django, Node.js); DevOps tools (Git, Docker, Kubernetes, Jenkins, JIRA, CI/CD, MedCoder, MCP Protocols, LabVIEW); and AI platforms (OpenAI API, Microsoft Azure, Amazon Bedrock, Hugging Face, AWS EC2/S3, Multi-Agent Architectures, ChromaDB).';
    } else if (lower.includes('project')) {
        reply = 'Featured projects: Sign Language Converter (CNN+OpenCV, 98% accuracy), Voice AI Agent (LangChain & Groq API voice assistant), and a RAG Pipeline Diagram demonstrating vector retrieval → LLM for real-time Q&A.';
    } else if (lower.includes('experience') || lower.includes('work')) {
        reply = 'Experience highlights: AI Developer @ Intilt (Jan 2025–Present) building RAG pipelines & multi-agent workflows; AI Developer @ Texas Tech University (Aug 2023–Jan 2025) creating LLM apps & RAG pipelines; Data Analyst Intern @ Norm Software (May 2022–May 2023) analyzing EHR data & integrating REST APIs.';
    } else if (lower.includes('about') || lower.includes('who are')) {
        reply = 'I’m Sasi Boyapati, an AI/ML Developer with 3+ years building deep learning, NLP, and RAG solutions. I blend marketing strategy with AI to boost engagement by 30%+ and automate workflows.';
    } else {
        reply = 'I can tell you about my skills, my projects, my experience, or who I am—just ask!';
    }
    setTimeout(() => appendMessage(reply, 'bot'), 500);
});

chatInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        chatSend.click();
    }
});