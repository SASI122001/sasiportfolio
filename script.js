// 1) Load particles.js
particlesJS.load('particles-js', 'assets/particles.json', () => {
  console.log('particles.js loaded');
});

// 2) Initialize AOS
AOS.init({ duration: 800, once: true });

// 3) Typed.js Hero Text
new Typed('#typed', {
  strings: [
    'AI/ML Developer',
    'LLM & RAG Engineer',
    'Computer Vision Practitioner',
    'MLOps on AWS (SageMaker/EKS)',
    'Generative AI Builder'
  ],
  typeSpeed: 80,
  backSpeed: 40,
  loop: true
});

// 4) Vanilla Tilt on cards
document.querySelectorAll('[data-tilt]').forEach(el => {
  VanillaTilt.init(el, { max: 15, speed: 400, glare: true, 'max-glare': 0.2 });
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
      setTimeout(() => (contactSuccess.style.display = 'none'), 5000);
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
    reply = [
      'Core skills:',
      '• Python, SQL, Java, R, TypeScript, JavaScript',
      '• PyTorch, TensorFlow, Keras, scikit-learn',
      '• Hugging Face, LangChain, LlamaIndex, OpenCV',
      '• NLP: GPT, BERT, LSTM/RNN/CNN, RAG',
      '• Data/Viz: Pandas, NumPy, Spark, Databricks, PostgreSQL, Snowflake, Tableau, Power BI',
      '• Cloud/DevOps: AWS (SageMaker, EC2, Bedrock), Docker, Kubernetes, Jenkins, CI/CD, Pinecone, FAISS/ChromaDB',
      '• Web: FastAPI, Flask, Django, React, Angular, REST/WebSockets'
    ].join('\n');
  } else if (lower.includes('project')) {
    reply = [
      'Featured projects:',
      '• Sign Language Converter — ≈98% CNN+LSTM; sign-to-text + TTS',
      '• Voice AI Agent — Groq + LangChain; function calling; wake-word guarded',
      '• LLM Math Reasoning — PPO on GPT-3.5/LLaMA-7B; 93.4% accuracy',
      '• Predictive Customer Analytics — churn >0.90 AUC; forecasting +30%',
      '• EquityResearchTool — Sharpe/MaxDD/Beta & valuation with LLM reports'
    ].join('\n');
  } else if (lower.includes('experience') || lower.includes('work')) {
    reply = [
      'Experience highlights:',
      '• UnitedHealth Group — BERT claims (+28% accuracy); fraud 93% precision; $3.2M+ saved/yr',
      '• Texas Tech University — RAG + LangChain (+15% retrieval); PyTorch/FastAPI MLOps (+12% prod accuracy)',
      '• Intilt — Insurance AI platform (50K+ policies); claims TAT −38%; fraud 92% accuracy'
    ].join('\n');
  } else if (lower.includes('cert') || lower.includes('certification')) {
    reply = [
      'Certifications:',
      '• AWS Certified AI Practitioner (2025)',
      '• Amazon Bedrock — Generative AI (2025)',
      '• Professional LLM App Dev (Euron, 2025)',
      '• AI Extern — AT&T (2024)'
    ].join('\n');
  } else if (lower.includes('about') || lower.includes('who are')) {
    reply =
      'I’m Sasi Boyapati — AI/ML Developer focused on LLMs, CV, and MLOps. I build production systems that improve accuracy, automate workflows, and drive measurable impact.';
  } else {
    reply = 'Ask me about my skills, projects, experience, or certifications!';
  }

  setTimeout(() => appendMessage(reply, 'bot'), 400);
});

chatInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    chatSend.click();
  }
});

/* ===== Resume Gate Logic (download-only) ===== */
/**
 * Set your resume path here.
 * PATH_A: assets/resume/SasiAIMLResume.pdf  (recommended)
 * PATH_B: resume/SasiAIMLResume.pdf         (if you keep a top-level /resume)
 */
const PATH_A = 'resume/SasiAIMLResume.pdf';
const PATH_B = 'resume/SasiAIMLResume.pdf';

// 👉 Choose ONE:
const resumePDF = PATH_A; // change to PATH_B if your file lives at /resume/...

const gate = document.getElementById('resumeGate');
const openBtn = document.getElementById('openResumeGate');
const enterBtn = document.getElementById('gateEnterBtn');
const closeBtn = document.getElementById('gateCloseBtn');

function openGate() {
  gate.classList.add('open');
  gate.setAttribute('aria-hidden', 'false');
}
function closeGate() {
  gate.classList.remove('open');
  gate.setAttribute('aria-hidden', 'true');
}

/** Force a file download without opening a new tab */
function downloadResume(url, filename = 'Sasi_Boyapati_Resume.pdf') {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => a.remove(), 100);
}

if (openBtn) openBtn.addEventListener('click', openGate);
if (closeBtn) closeBtn.addEventListener('click', closeGate);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeGate(); });

if (enterBtn) {
  enterBtn.addEventListener('click', () => {
    const card = document.querySelector('.gate-card');
    card.style.transform = 'rotateY(180deg)';
    burstConfetti();

    setTimeout(() => {
      closeGate();
      downloadResume(resumePDF);
      setTimeout(() => { card.style.transform = ''; }, 400);
    }, 650);
  });
}

/* ===== INTRO LOGIN GATE ===== */
const introGate = document.getElementById('introGate');
const introEnterBtn = document.getElementById('introEnterBtn');
const rememberIntro = document.getElementById('rememberIntro');

// To skip on return visits, uncomment this block:
// if (localStorage.getItem('introPassed') === '1') {
//   introGate.classList.remove('open');
//   introGate.setAttribute('aria-hidden', 'true');
//   document.body.classList.remove('no-scroll');
// }

function closeIntroGate() {
  introGate.classList.remove('open');
  introGate.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}

if (introEnterBtn) {
  introEnterBtn.addEventListener('click', () => {
    if (rememberIntro && rememberIntro.checked) {
      localStorage.setItem('introPassed', '1');
    }
    introGate.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 380, easing: 'ease-out' })
      .onfinish = closeIntroGate;
  });
}

/* Confetti burst (no deps) */
function burstConfetti() {
  const N = 24;
  for (let i = 0; i < N; i++) {
    const p = document.createElement('span');
    p.className = 'mini-confetti';
    Object.assign(p.style, {
      position: 'fixed', left: '50%', top: '50%', width: '8px', height: '8px',
      borderRadius: '2px', background: i % 3 ? '#6b77ff' : '#4e54c8', zIndex: 130
    });
    document.body.appendChild(p);
    const dx = (Math.random() - 0.5) * 340;
    const dy = (Math.random() - 0.5) * 280;
    const t = 600 + Math.random() * 500;
    p.animate(
      [{ transform: 'translate(-50%, -50%)', opacity: 1 },
       { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`, opacity: 0 }],
      { duration: t, easing: 'cubic-bezier(.2,.6,.2,1)' }
    ).onfinish = () => p.remove();
  }
}
