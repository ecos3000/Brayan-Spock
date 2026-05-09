/**
 * ADAN_CB90 Global Animations Script
 * A zero-dependency vanilla JS animation engine for:
 * - Scroll Progress Bar
 * - Custom Trailing Cursor
 * - Reveal on Scroll
 * - Smooth Anchor Scrolling
 * - Text Scramble Effects
 * - Magnetic Elements
 * - Navbar Glassmorphism
 */

(function () {
  'use strict';

  // --- Configuration & Initialization ---
  const CONFIG = {
    magneticRadius: 80,
    magneticStrength: 0.4,
    cursorLerp: 0.8,
    cursorTrailLerp: 0.5,
    scrambleChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%"
  };

  // Inject required styles for global elements
  const style = document.createElement('style');
  style.innerHTML = `
    #scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(to right, #ff6b00, #7b61ff);
      z-index: 10000;
      width: 0%;
      pointer-events: none;
    }

    #v-cursor-dot, #v-cursor-ring {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      will-change: transform;
    }

    #v-cursor-dot {
      width: 6px;
      height: 6px;
      background: #ff6b00;
      border-radius: 50%;
    }

    #v-cursor-ring {
      width: 38px;
      height: 38px;
      border: 1px solid rgba(255, 107, 0, 0.4);
      border-radius: 50%;
      transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
    }

    .cursor-active #v-cursor-ring {
      width: 60px;
      height: 60px;
      border-color: #ff6b00;
      background: rgba(255, 107, 0, 0.05);
    }

    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }

    .reveal.active {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // --- 1. Scroll Progress Bar ---
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrollPercent + '%';
  });

  // --- 2. Custom Cursor with Lerp ---
  const dot = document.createElement('div');
  dot.id = 'v-cursor-dot';
  const ring = document.createElement('div');
  ring.id = 'v-cursor-ring';
  
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouse = { x: -100, y: -100 };
  let dotPos = { x: -100, y: -100 };
  let ringPos = { x: -100, y: -100 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // Detect if hovering interactive elements
    const target = e.target;
    if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('.magnetic') || target.closest('a') || target.closest('button')) {
      document.body.classList.add('cursor-active');
    } else {
      document.body.classList.remove('cursor-active');
    }
  });

  function updateCursor() {
    // Lerp calculation: CurrentValue + (TargetValue - CurrentValue) * Friction
    dotPos.x += (mouse.x - dotPos.x) * CONFIG.cursorLerp;
    dotPos.y += (mouse.y - dotPos.y) * CONFIG.cursorLerp;
    ringPos.x += (mouse.x - ringPos.x) * CONFIG.cursorTrailLerp;
    ringPos.y += (mouse.y - ringPos.y) * CONFIG.cursorTrailLerp;

    dot.style.transform = `translate(${dotPos.x}px, ${dotPos.y}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;

    requestAnimationFrame(updateCursor);
  }
  updateCursor();

  // --- 3. Reveal on Scroll ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15 });

  function initReveals() {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }

  // --- 4. Smooth Scroll ---
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a[href^="#"]');
    if (!target) return;
    
    e.preventDefault();
    const id = target.getAttribute('href');
    if (id === '#') return;
    
    const element = document.querySelector(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  });

  // --- 5. Text Scramble ---
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = CONFIG.scrambleChars;
      this.update = this.update.bind(this);
    }
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => (this.resolve = resolve));
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || "";
        const to = newText[i] || "";
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    update() {
      let output = "";
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="opacity-50">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }

  const scrambleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.scrambled) {
        const scrambler = new TextScramble(entry.target);
        scrambler.setText(entry.target.innerText);
        entry.target.dataset.scrambled = "true";
      }
    });
  }, { threshold: 0.5 });

  function initScrambles() {
    document.querySelectorAll('[data-scramble]').forEach(el => scrambleObserver.observe(el));
  }

  // --- 6. Magnetic Elements ---
  function initMagnetic() {
    document.querySelectorAll('.magnetic').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        el.style.transform = `translate(${x * CONFIG.magneticStrength}px, ${y * CONFIG.magneticStrength}px)`;
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
      });
    });
  }

  // --- 7. Navbar Scroll State ---
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (nav) {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  });

  // Handle Dynamic Content Changes
  const mutationObserver = new MutationObserver(() => {
    initReveals();
    initScrambles();
    initMagnetic();
  });

  window.addEventListener('DOMContentLoaded', () => {
    initReveals();
    initScrambles();
    initMagnetic();
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  });

})();
