# A-Z Web Animations, Scroll Effects & Parallax — Complete Reference

---

## Table of Contents

1. [Core Concepts](#core-concepts)
2. [A — Appear / Attention Seekers](#a--appear--attention-seekers)
3. [B — Bounce & Blur](#b--bounce--blur)
4. [C — Counter & Clip](#c--counter--clip)
5. [D — Draw / SVG Path](#d--draw--svg-path)
6. [E — Entrance Animations](#e--entrance-animations)
7. [F — Fade Effects](#f--fade-effects)
8. [G — GSAP ScrollTrigger](#g--gsap-scrolltrigger)
9. [H — Horizontal Scroll](#h--horizontal-scroll)
10. [I — Intersection Observer API](#i--intersection-observer-api)
11. [J — Jitter / Shake](#j--jitter--shake)
12. [K — Keyframe Animations](#k--keyframe-animations)
13. [L — Lenis / Locomotive Smooth Scroll](#l--lenis--locomotive-smooth-scroll)
14. [M — Morphing & Masking](#m--morphing--masking)
15. [N — Number / Typewriter](#n--number--typewriter)
16. [O — Overflow Reveal](#o--overflow-reveal)
17. [P — Parallax Effects](#p--parallax-effects)
18. [Q — Queue / Stagger](#q--queue--stagger)
19. [R — Rotate & Roll](#r--rotate--roll)
20. [S — Scroll-Driven Animations (CSS Native)](#s--scroll-driven-animations-css-native)
21. [T — Text Reveal & Split Text](#t--text-reveal--split-text)
22. [U — UI Micro-interactions](#u--ui-micro-interactions)
23. [V — View Transitions API](#v--view-transitions-api)
24. [W — Wipe / Curtain](#w--wipe--curtain)
25. [X — X-axis Slide](#x--x-axis-slide)
26. [Y — Y-axis Slide (Vertical)](#y--y-axis-slide-vertical)
27. [Z — Zoom & Z-depth](#z--zoom--z-depth)
28. [Library Comparison](#library-comparison)
29. [Browser Support](#browser-support)
30. [Performance Tips](#performance-tips)

---

## Core Concepts

### The Animation Pipeline
```
User Scrolls → Trigger → Animation Plays → Element Transforms
```

### GPU-Accelerated Properties (always prefer these)
| Property | Why Fast |
|----------|----------|
| `transform: translate/scale/rotate` | Compositor thread, no reflow |
| `opacity` | Compositor thread |
| `will-change: transform` | Pre-promotes to own layer |
| `filter` | GPU, but expensive |

### Properties That Cause Reflow (avoid animating)
`width`, `height`, `top`, `left`, `margin`, `padding`, `border`

---

## A — Appear / Attention Seekers

### CSS Pulse
```css
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.05); }
}
.pulse {
  animation: pulse 2s ease-in-out infinite;
}
```

### CSS Wobble
```css
@keyframes wobble {
  0%   { transform: rotate(0deg); }
  15%  { transform: rotate(-5deg); }
  30%  { transform: rotate(5deg); }
  45%  { transform: rotate(-3deg); }
  60%  { transform: rotate(3deg); }
  100% { transform: rotate(0deg); }
}
```

### CSS Heartbeat
```css
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  14%      { transform: scale(1.3); }
  28%      { transform: scale(1); }
  42%      { transform: scale(1.3); }
  70%      { transform: scale(1); }
}
```

---

## B — Bounce & Blur

### CSS Bounce
```css
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(-30px);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
.bounce { animation: bounce 1s infinite; }
```

### Blur-In on Scroll (JS + CSS)
```css
.blur-in {
  filter: blur(10px);
  opacity: 0;
  transition: filter 0.6s ease, opacity 0.6s ease;
}
.blur-in.visible {
  filter: blur(0);
  opacity: 1;
}
```
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add('visible'));
}, { threshold: 0.2 });
document.querySelectorAll('.blur-in').forEach(el => observer.observe(el));
```

---

## C — Counter & Clip

### Animated Number Counter
```js
function animateCounter(el, from, to, duration = 2000) {
  const start = performance.now();
  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    el.textContent = Math.floor(ease * (to - from) + from).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
// Usage
animateCounter(document.querySelector('.counter'), 0, 9500);
```

### CSS Clip-Path Reveal
```css
.clip-reveal {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 0.8s cubic-bezier(0.77, 0, 0.175, 1);
}
.clip-reveal.visible {
  clip-path: inset(0 0% 0 0);
}
```

---

## D — Draw / SVG Path

### SVG Path Drawing Animation
```css
.svg-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  transition: stroke-dashoffset 2s ease;
}
.svg-path.visible {
  stroke-dashoffset: 0;
}
```
```js
// Auto-calculate path length
document.querySelectorAll('.svg-path').forEach(path => {
  const len = path.getTotalLength();
  path.style.strokeDasharray = len;
  path.style.strokeDashoffset = len;
});
```

### GSAP SVG Draw
```js
gsap.from('.svg-path', {
  drawSVG: '0%',
  duration: 2,
  ease: 'power2.inOut',
  scrollTrigger: { trigger: '.svg-path', start: 'top 80%' }
});
```

---

## E — Entrance Animations

### Fade + Slide Up (most common pattern)
```css
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Flip In
```css
@keyframes flipInX {
  from {
    transform: perspective(400px) rotateX(90deg);
    opacity: 0;
  }
  to {
    transform: perspective(400px) rotateX(0deg);
    opacity: 1;
  }
}
.flip-in { animation: flipInX 0.6s ease forwards; }
```

### Scale + Fade In
```css
.scale-in {
  opacity: 0;
  transform: scale(0.85);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.scale-in.visible { opacity: 1; transform: scale(1); }
```

---

## F — Fade Effects

### Fade In / Out
```css
.fade-in  { animation: fadeIn  0.5s ease forwards; }
.fade-out { animation: fadeOut 0.5s ease forwards; }

@keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
@keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
```

### Fade In on Scroll with delay stagger
```css
.fade-stagger { opacity: 0; transform: translateY(20px); }
.fade-stagger:nth-child(1) { transition-delay: 0.1s; }
.fade-stagger:nth-child(2) { transition-delay: 0.2s; }
.fade-stagger:nth-child(3) { transition-delay: 0.3s; }
.fade-stagger.visible { opacity: 1; transform: translateY(0); transition: all 0.6s ease; }
```

### Fade from Direction
```css
.fade-left  { opacity: 0; transform: translateX(-60px); }
.fade-right { opacity: 0; transform: translateX(60px); }
.fade-up    { opacity: 0; transform: translateY(60px); }
.fade-down  { opacity: 0; transform: translateY(-60px); }

[class*="fade-"].visible {
  opacity: 1;
  transform: translate(0, 0);
  transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

---

## G — GSAP ScrollTrigger

### Setup
```bash
npm install gsap
```
```js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
```

### Basic ScrollTrigger
```js
gsap.from('.box', {
  opacity: 0,
  y: 80,
  duration: 1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.box',
    start: 'top 80%',   // when top of .box hits 80% of viewport
    end: 'top 30%',
    toggleActions: 'play none none reverse',
    // toggleActions: onEnter onLeave onEnterBack onLeaveBack
    // values: "play", "pause", "resume", "reset", "restart", "complete", "reverse", "none"
  }
});
```

### Scrub (animation tied to scroll position)
```js
gsap.to('.progress-bar', {
  scaleX: 1,
  transformOrigin: 'left center',
  ease: 'none',
  scrollTrigger: {
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,   // true = direct link, number = lag seconds
  }
});
```

### Pin (sticky section)
```js
ScrollTrigger.create({
  trigger: '.pin-section',
  start: 'top top',
  end: '+=500',     // pin for 500px of scroll
  pin: true,
  pinSpacing: true,
});
```

### Batch (multiple elements stagger on scroll)
```js
ScrollTrigger.batch('.card', {
  onEnter: (elements) => {
    gsap.from(elements, {
      opacity: 0,
      y: 60,
      stagger: 0.15,
      duration: 0.8,
    });
  },
});
```

### Timeline with ScrollTrigger
```js
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.section',
    start: 'top top',
    end: '+=1000',
    scrub: 1,
    pin: true,
  }
});
tl.from('.title',    { opacity: 0, y: 100 })
  .from('.subtitle', { opacity: 0, y: 80 }, '-=0.3')
  .from('.image',    { scale: 0.5, opacity: 0 }, '-=0.2');
```

---

## H — Horizontal Scroll

### Pure CSS Horizontal Scroll Snap
```css
.scroll-container {
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}
.scroll-item {
  min-width: 100vw;
  scroll-snap-align: start;
}
```

### GSAP Horizontal Scroll Section
```js
const sections = gsap.utils.toArray('.panel');
gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.horizontal-scroll',
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => '+=' + document.querySelector('.horizontal-scroll').offsetWidth,
  }
});
```

---

## I — Intersection Observer API

### Basic Observer
```js
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  },
  {
    threshold: 0.2,        // 20% of element visible
    rootMargin: '0px 0px -50px 0px',  // trigger 50px before
  }
);
document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

### Observer with Options
```js
// Re-animate on every enter/leave
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  });
}, { threshold: [0, 0.25, 0.5, 0.75, 1] }); // multiple thresholds
```

### Scroll Progress per Element
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const ratio = entry.intersectionRatio;
    entry.target.style.opacity = ratio;
    entry.target.style.transform = `translateY(${(1 - ratio) * 40}px)`;
  });
}, { threshold: Array.from({ length: 101 }, (_, i) => i / 100) });
```

---

## J — Jitter / Shake

### CSS Shake
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
  20%, 40%, 60%, 80%      { transform: translateX(6px); }
}
.shake { animation: shake 0.6s ease-in-out; }
```

### CSS Jello
```css
@keyframes jello {
  0%, 100% { transform: skewX(0deg) skewY(0deg); }
  30%      { transform: skewX(-12deg) skewY(-12deg); }
  40%      { transform: skewX(6deg) skewY(6deg); }
  50%      { transform: skewX(-4deg) skewY(-4deg); }
  65%      { transform: skewX(3deg) skewY(3deg); }
  75%      { transform: skewX(-2deg) skewY(-2deg); }
}
```

---

## K — Keyframe Animations

### Full Keyframe Control
```css
@keyframes myAnimation {
  0%   { opacity: 0; transform: scale(0.5) rotate(-10deg); }
  50%  { opacity: 0.8; transform: scale(1.1) rotate(5deg); }
  100% { opacity: 1; transform: scale(1) rotate(0deg); }
}
.animated {
  animation: myAnimation 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
```

### Chained Keyframes with Custom Easing
```css
.element {
  animation:
    fadeIn   0.3s ease forwards,
    slideUp  0.5s 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards,
    pulse    2s   0.8s ease-in-out infinite;
}
```

---

## L — Lenis / Locomotive Smooth Scroll

### Lenis Smooth Scroll (recommended, lightweight)
```bash
npm install lenis
```
```js
import Lenis from 'lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Sync with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### Locomotive Scroll (heavier, more features)
```bash
npm install locomotive-scroll
```
```js
import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  multiplier: 1,
  class: 'is-inview',
});
```
```html
<!-- HTML attributes for Locomotive -->
<section data-scroll-section>
  <div data-scroll data-scroll-speed="2">Parallax element</div>
  <div data-scroll data-scroll-class="appear" data-scroll-repeat="true">Repeating</div>
</section>
```

---

## M — Morphing & Masking

### SVG Morphing with GSAP MorphSVG
```js
// Requires GSAP MorphSVG plugin (Club GreenSock)
gsap.to('#shape', {
  morphSVG: '#target-shape',
  duration: 1.5,
  ease: 'power2.inOut',
  scrollTrigger: { trigger: '#shape', start: 'top 70%' }
});
```

### CSS Clip-Path Morphing
```css
.morph {
  clip-path: circle(50%);
  transition: clip-path 1s cubic-bezier(0.77, 0, 0.175, 1);
}
.morph:hover {
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
}
```

### Text Masking Reveal
```css
.text-mask {
  background: linear-gradient(90deg, #000 0%, transparent 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 100%;
  background-position: 100%;
  transition: background-position 1s ease;
}
.text-mask.visible { background-position: 0%; }
```

---

## N — Number / Typewriter

### Typewriter Effect
```js
function typeWriter(el, text, speed = 50) {
  let i = 0;
  el.textContent = '';
  const type = () => {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(type, speed);
    }
  };
  type();
}
```

### CSS Typewriter (pure CSS)
```css
.typewriter {
  overflow: hidden;
  border-right: 2px solid;
  white-space: nowrap;
  width: 0;
  animation:
    typing   3s steps(30) forwards,
    blink    0.75s step-end infinite;
}
@keyframes typing { to { width: 100%; } }
@keyframes blink  { 50% { border-color: transparent; } }
```

---

## O — Overflow Reveal

### Sliding text reveal from bottom
```css
.reveal-wrapper {
  overflow: hidden;
}
.reveal-text {
  display: block;
  transform: translateY(100%);
  transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
}
.reveal-wrapper.visible .reveal-text {
  transform: translateY(0);
}
```

### Curtain Wipe Reveal
```css
.curtain-wrap { position: relative; overflow: hidden; }
.curtain-wrap::after {
  content: '';
  position: absolute;
  inset: 0;
  background: #000;
  transform: scaleX(1);
  transform-origin: right;
  transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
}
.curtain-wrap.visible::after { transform: scaleX(0); }
```

---

## P — Parallax Effects

### CSS-Only Parallax (background)
```css
.parallax-bg {
  background-image: url('bg.jpg');
  background-attachment: fixed;   /* key property */
  background-size: cover;
  background-position: center;
  min-height: 60vh;
}
/* Note: background-attachment: fixed has poor mobile support */
```

### JS Parallax (scroll-based)
```js
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('[data-parallax]').forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0.5;
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
});
```

### Multi-layer Parallax
```html
<div class="parallax-scene">
  <div class="layer" data-parallax="0.2"><!-- sky --></div>
  <div class="layer" data-parallax="0.5"><!-- mountains --></div>
  <div class="layer" data-parallax="0.8"><!-- trees --></div>
  <div class="layer" data-parallax="1.0"><!-- foreground --></div>
</div>
```
```js
const handleParallax = () => {
  const scrollY = window.pageYOffset;
  document.querySelectorAll('.layer').forEach(layer => {
    const speed = parseFloat(layer.dataset.parallax);
    const rect = layer.parentElement.getBoundingClientRect();
    layer.style.transform = `translateY(${(scrollY - rect.top - scrollY) * speed}px)`;
  });
};
window.addEventListener('scroll', handleParallax, { passive: true });
```

### GSAP Parallax
```js
gsap.utils.toArray('[data-parallax]').forEach(el => {
  const speed = parseFloat(el.dataset.parallax) || 0.5;
  gsap.to(el, {
    yPercent: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    }
  });
});
```

---

## Q — Queue / Stagger

### CSS Stagger with nth-child
```css
.stagger-item {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.stagger-item:nth-child(1)  { transition-delay: 0.05s; }
.stagger-item:nth-child(2)  { transition-delay: 0.10s; }
.stagger-item:nth-child(3)  { transition-delay: 0.15s; }
.stagger-item:nth-child(4)  { transition-delay: 0.20s; }
.stagger-item:nth-child(5)  { transition-delay: 0.25s; }

.stagger-container.visible .stagger-item {
  opacity: 1;
  transform: translateY(0);
}
```

### JS Dynamic Stagger
```js
document.querySelectorAll('.stagger-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
});
```

### GSAP Stagger
```js
gsap.from('.card', {
  opacity: 0,
  y: 60,
  stagger: {
    amount: 0.8,      // total stagger time spread across all
    from: 'start',    // 'start', 'end', 'center', 'random', index
    ease: 'power2.out',
  },
  duration: 0.8,
  scrollTrigger: { trigger: '.cards-grid', start: 'top 75%' }
});
```

### GSAP 2D Stagger (grid)
```js
gsap.from('.grid-item', {
  opacity: 0,
  scale: 0.8,
  stagger: {
    amount: 1.5,
    grid: [3, 4],       // rows x cols
    from: 'center',
  }
});
```

---

## R — Rotate & Roll

### Rotate on Scroll
```js
gsap.to('.wheel', {
  rotation: 360,
  ease: 'none',
  scrollTrigger: {
    trigger: '.wheel-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
  }
});
```

### CSS 3D Rotate Card
```css
.card-3d {
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.card-3d:hover {
  transform: rotateY(180deg);
}
.card-front, .card-back {
  backface-visibility: hidden;
  position: absolute;
  inset: 0;
}
.card-back { transform: rotateY(180deg); }
```

### Scroll-driven Rotation (CSS)
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}
.spinner {
  animation: spin linear both;
  animation-timeline: scroll();
  animation-range: 0% 100%;
}
```

---

## S — Scroll-Driven Animations (CSS Native)

> **Browser support:** Chrome 115+, Edge 115+. Firefox/Safari: partial or flagged.

### scroll() timeline (document scroll)
```css
@keyframes revealCard {
  from { opacity: 0; transform: translateY(60px); }
  to   { opacity: 1; transform: translateY(0); }
}
.card {
  animation: revealCard linear both;
  animation-timeline: scroll(root block); /* root = document, block = vertical */
  animation-range: entry 0% entry 40%;   /* when does the element enter viewport */
}
```

### view() timeline (per-element viewport entry)
```css
.section-title {
  animation: fadeSlideUp linear both;
  animation-timeline: view();
  animation-range: entry 10% entry 60%;
}
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(50px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### Scroll Progress Bar
```css
#progress {
  position: fixed;
  top: 0; left: 0;
  height: 4px;
  background: #6c63ff;
  transform-origin: left;
  animation: progress linear;
  animation-timeline: scroll(root);
}
@keyframes progress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
```

### Named Scroll Timeline
```css
.scroll-area {
  overflow-y: scroll;
  scroll-timeline: --myTimeline block;
}
.animated-item {
  animation: slideIn linear both;
  animation-timeline: --myTimeline;
}
```

---

## T — Text Reveal & Split Text

### Word-by-word reveal
```js
function splitWords(el) {
  el.innerHTML = el.textContent
    .split(' ')
    .map(w => `<span class="word"><span class="word-inner">${w}</span></span>`)
    .join(' ');
}

// CSS
// .word { overflow: hidden; display: inline-block; }
// .word-inner { display: inline-block; transform: translateY(100%); transition: transform 0.5s ease; }
// .visible .word-inner { transform: translateY(0); }
```

### Character-by-character reveal
```js
function splitChars(el) {
  el.innerHTML = [...el.textContent]
    .map((c, i) => `<span style="transition-delay:${i * 0.03}s">${c === ' ' ? '&nbsp;' : c}</span>`)
    .join('');
}
```

### GSAP SplitText
```js
// Requires GSAP SplitText plugin
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

const split = new SplitText('.headline', { type: 'words,chars' });
gsap.from(split.chars, {
  opacity: 0,
  y: 40,
  rotateX: -90,
  stagger: 0.02,
  duration: 0.6,
  ease: 'back.out(1.7)',
  scrollTrigger: { trigger: '.headline', start: 'top 80%' }
});
```

### CSS Gradient Text Scroll
```css
.gradient-text {
  background: linear-gradient(90deg, #6c63ff 0%, #ff6584 50%, #43b89c 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease infinite;
}
@keyframes gradientShift {
  0%   { background-position: 0% center; }
  50%  { background-position: 100% center; }
  100% { background-position: 0% center; }
}
```

---

## U — UI Micro-interactions

### Button ripple effect
```css
.btn { position: relative; overflow: hidden; }
.btn::after {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  width: 0; height: 0;
  background: rgba(255,255,255,0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.4s ease, height 0.4s ease, opacity 0.4s ease;
}
.btn:active::after { width: 200px; height: 200px; opacity: 0; }
```

### Magnetic button (JS)
```js
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });
});
```

### Hover underline slide
```css
.hover-link {
  position: relative;
  text-decoration: none;
}
.hover-link::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 100%; height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}
.hover-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

---

## V — View Transitions API

### Basic page transition
```js
// Wrap navigation in startViewTransition
document.querySelector('nav a').addEventListener('click', async (e) => {
  e.preventDefault();
  const href = e.currentTarget.href;

  await document.startViewTransition(async () => {
    const res = await fetch(href);
    const html = await res.text();
    document.body.innerHTML = new DOMParser()
      .parseFromString(html, 'text/html').body.innerHTML;
    history.pushState({}, '', href);
  });
});
```

### Custom transition CSS
```css
::view-transition-old(root) {
  animation: slide-out 0.3s ease forwards;
}
::view-transition-new(root) {
  animation: slide-in 0.3s ease forwards;
}
@keyframes slide-out {
  to { transform: translateX(-100%); opacity: 0; }
}
@keyframes slide-in {
  from { transform: translateX(100%); opacity: 0; }
}
```

### Named view transitions (element-level)
```css
.hero-image { view-transition-name: hero; }

::view-transition-old(hero) { animation: scale-out 0.5s ease; }
::view-transition-new(hero) { animation: scale-in  0.5s ease; }
```

---

## W — Wipe / Curtain

### Horizontal wipe reveal
```css
.wipe {
  position: relative;
  overflow: hidden;
}
.wipe::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #111;
  transform-origin: left;
  transition: transform 0.9s cubic-bezier(0.77, 0, 0.175, 1);
}
.wipe.visible::before {
  transform: scaleX(0);
  transform-origin: right;
}
```

### Image wipe on scroll
```js
gsap.from('.wipe-image', {
  clipPath: 'inset(0 100% 0 0)',
  ease: 'power2.inOut',
  duration: 1.2,
  scrollTrigger: {
    trigger: '.wipe-image',
    start: 'top 75%',
  }
});
```

---

## X — X-axis Slide

### Slide in from left / right
```css
.slide-left  { transform: translateX(-100px); opacity: 0; }
.slide-right { transform: translateX(100px);  opacity: 0; }

.slide-left.visible,
.slide-right.visible {
  transform: translateX(0);
  opacity: 1;
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              opacity   0.8s ease;
}
```

### Horizontal marquee / ticker
```css
.marquee-track {
  display: flex;
  overflow: hidden;
}
.marquee-content {
  display: flex;
  gap: 2rem;
  animation: marquee 20s linear infinite;
  white-space: nowrap;
}
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

---

## Y — Y-axis Slide (Vertical)

### Slide up on scroll (clean implementation)
```css
.slide-up-item {
  --delay: 0s;
  opacity: 0;
  transform: translateY(50px);
  transition:
    opacity   0.7s var(--delay) ease,
    transform 0.7s var(--delay) cubic-bezier(0.34, 1.56, 0.64, 1);
}
.slide-up-item.visible {
  opacity: 1;
  transform: translateY(0);
}
```
```js
document.querySelectorAll('.slide-up-item').forEach((el, i) => {
  el.style.setProperty('--delay', `${i * 0.1}s`);
  observer.observe(el);
});
```

### Sticky scroll narrative (vertical pinning)
```js
const panels = gsap.utils.toArray('.narrative-panel');
panels.forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    start: 'top top',
    end: () => `+=${panel.offsetHeight}`,
    pin: true,
    pinSpacing: false,
  });
});
```

---

## Z — Zoom & Z-depth

### Zoom in on scroll
```css
.zoom-in {
  transform: scale(0.8);
  opacity: 0;
  transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease;
}
.zoom-in.visible { transform: scale(1); opacity: 1; }
```

### Ken Burns (continuous slow zoom)
```css
@keyframes kenBurns {
  from { transform: scale(1) translate(0, 0); }
  to   { transform: scale(1.15) translate(-2%, -1%); }
}
.ken-burns {
  animation: kenBurns 10s ease-in-out alternate infinite;
  transform-origin: center;
}
```

### GSAP Z-depth camera push
```js
gsap.from('.scene', {
  z: -500,
  opacity: 0,
  transformOrigin: '50% 50%',
  ease: 'power3.out',
  duration: 1.5,
  scrollTrigger: { trigger: '.scene', start: 'top 80%' }
});
```

### Scroll-driven hero zoom
```js
gsap.to('.hero-bg', {
  scale: 1.3,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
  }
});
```

---

## Library Comparison

| Library | Size | License | Best For |
|---------|------|---------|----------|
| **GSAP** (free) | ~70kB | Free/paid plugins | Professional scroll animations, timelines |
| **GSAP ScrollTrigger** | +25kB | Free | Scroll-tied animations, pin, scrub |
| **Lenis** | ~5kB | MIT | Smooth scroll only, pairs with GSAP |
| **Locomotive Scroll** | ~20kB | MIT | Smooth scroll + data-scroll attributes |
| **AOS** (Animate on Scroll) | ~13kB | MIT | Quick setup, attribute-based |
| **ScrollReveal** | ~8kB | GPL/Commercial | Simple scroll reveals |
| **Motion One** | ~15kB | MIT | WAAPI-based, modern, lightweight |
| **Framer Motion** (React) | ~50kB | MIT | React animations |
| **anime.js** | ~17kB | MIT | JS keyframe/timeline animations |
| **Three.js** | ~600kB | MIT | 3D scroll scenes |
| **CSS native** (scroll-timeline) | 0kB | — | Chrome 115+, no-JS scroll animations |

---

## AOS (Animate on Scroll) Quick Setup

```bash
npm install aos
```
```js
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 800,
  easing: 'ease-in-out-cubic',
  once: true,
  offset: 80,
});
```
```html
<div data-aos="fade-up">Fade Up</div>
<div data-aos="fade-left" data-aos-delay="200">Fade Left</div>
<div data-aos="zoom-in"   data-aos-duration="1000">Zoom In</div>
<div data-aos="flip-left" data-aos-easing="ease-in-back">Flip</div>
```

**AOS animation values:** `fade`, `fade-up`, `fade-down`, `fade-left`, `fade-right`, `fade-up-right`, `fade-up-left`, `fade-down-right`, `fade-down-left`, `flip-up`, `flip-down`, `flip-left`, `flip-right`, `slide-up`, `slide-down`, `slide-left`, `slide-right`, `zoom-in`, `zoom-in-up`, `zoom-in-down`, `zoom-in-left`, `zoom-in-right`, `zoom-out`, `zoom-out-up`, `zoom-out-down`, `zoom-out-left`, `zoom-out-right`

---

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| CSS Transitions | ✅ All | ✅ All | ✅ All | ✅ All |
| CSS Animations (@keyframes) | ✅ All | ✅ All | ✅ All | ✅ All |
| Intersection Observer v2 | ✅ 74+ | ✅ 55+ | ✅ 12.1+ | ✅ 79+ |
| scroll-timeline (CSS native) | ✅ 115+ | ❌ | ❌ | ✅ 115+ |
| view() timeline | ✅ 115+ | ❌ | ❌ | ✅ 115+ |
| View Transitions API | ✅ 111+ | 🧪 | ❌ | ✅ 111+ |
| CSS Scroll Snap | ✅ All | ✅ All | ✅ All | ✅ All |
| will-change | ✅ All | ✅ All | ✅ All | ✅ All |
| background-attachment: fixed | ✅ | ✅ | ⚠️ No iOS | ✅ |
| Web Animations API | ✅ All | ✅ All | ✅ 13.1+ | ✅ All |

---

## Performance Tips

### 1. Always use `will-change` for heavy animations
```css
.animated { will-change: transform, opacity; }
/* Remove after animation completes to free GPU memory */
el.addEventListener('animationend', () => el.style.willChange = 'auto');
```

### 2. Use `passive` event listeners for scroll
```js
window.addEventListener('scroll', handler, { passive: true });
```

### 3. Debounce/Throttle scroll handlers
```js
function throttle(fn, delay) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= delay) { last = now; fn(...args); }
  };
}
window.addEventListener('scroll', throttle(handler, 16), { passive: true });
```

### 4. Use `requestAnimationFrame` for JS animations
```js
// Bad
window.addEventListener('scroll', () => { el.style.transform = '...'; });

// Good
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => { el.style.transform = '...'; ticking = false; });
    ticking = true;
  }
}, { passive: true });
```

### 5. Reduce Motion (accessibility)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
```js
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced) { /* init animations */ }
```

### 6. Avoid layout thrashing
```js
// Bad: forces reflow each iteration
elements.forEach(el => {
  el.style.height = el.offsetHeight + 10 + 'px'; // read then write
});

// Good: batch reads, then writes
const heights = elements.map(el => el.offsetHeight);        // all reads
elements.forEach((el, i) => el.style.height = heights[i] + 10 + 'px'); // all writes
```

### 7. CSS Easing Cheat Sheet
```
ease              = cubic-bezier(0.25, 0.1,  0.25, 1.0)
ease-in           = cubic-bezier(0.42, 0,    1.0,  1.0)
ease-out          = cubic-bezier(0,    0,    0.58, 1.0)
ease-in-out       = cubic-bezier(0.42, 0,    0.58, 1.0)
spring            = cubic-bezier(0.34, 1.56, 0.64, 1.0)  /* overshoots */
snappy            = cubic-bezier(0.77, 0,    0.175, 1.0) /* fast then slow */
smooth            = cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

---

*Generated: June 2026 — covers CSS3, GSAP 3.x, Lenis 1.x, Locomotive Scroll 4.x, AOS 2.x*
