// ! GSAP library
import gsap from "https://cdn.skypack.dev/gsap";
import ScrollTrigger from "https://cdn.skypack.dev/gsap/ScrollTrigger.js";

// ! this function is for the sky looping effect
const sky = document.querySelector(".sky");
let posX = 0;
const speed = 0.25;
function loopSky() {
  posX += speed;
  // Reset after one image width (adjust 1920 to your image width)
  if (posX >= 1920) posX = 0;
  sky.style.backgroundPositionX = `${posX}px`;
  requestAnimationFrame(loopSky);
}
loopSky();

// ! horizontal scrolling
gsap.registerPlugin(ScrollTrigger);
function horizontalScroll(containerSelector, contentSelector) {
  const wrapper = document.querySelector(containerSelector);
  const content = wrapper.querySelector(contentSelector);
  const scrollAmount = content.scrollWidth - window.innerWidth;
  gsap.to(content, {
    x: -scrollAmount,
    ease: "none",
    scrollTrigger: {
      trigger: wrapper,
      start: "top top",
      end: () => "+=" + scrollAmount,
      pin: true,
      scrub: 1,
      markers: false, // ← remove markers
      invalidateOnRefresh: true,
    },
  });
}

horizontalScroll(".storyWrapper", ".storyContent");

// !
function gsapTypewriter(el, speed = 0.08) {
  const content = el.textContent;
  el.textContent = ""; // clear
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.textContent = "|";
  el.appendChild(cursor);

  const chars = content.split("");
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

  // typing
  chars.forEach((char) => {
    tl.to(
      {},
      {
        duration: speed,
        onComplete: () => {
          cursor.before(document.createTextNode(char));
        },
      }
    );
  });
  tl.to({}, { duration: 1 });
  chars
    .slice()
    .reverse()
    .forEach(() => {
      tl.to(
        {},
        {
          duration: speed / 2,
          onComplete: () => {
            const nodes = el.childNodes;
            if (nodes.length > 1) {
              el.removeChild(nodes[nodes.length - 2]);
            }
          },
        }
      );
    });
}

document.querySelectorAll(".typewriter").forEach((el, i) => {
  gsapTypewriter(el, 0.08 + i * 0.01);
});
// ! Counter
const counter = document.querySelector(".counterO");
const target = parseInt(counter.textContent); // read number from HTML

const obj = { value: 0 };

gsap.to(obj, {
  value: target,
  duration: 3,
  roundProps: "value",
  onUpdate: () => {
    counter.te = obj.value;
  },
  ease: "power1.out",
});

/// Count number 
window.addEventListener('DOMContentLoaded', () => {

  function animateCounter(counter, target, duration = 1000) {
    let start = 0;
    const stepTime = Math.max(10, Math.floor(duration / target));
    
    function updateCounter() {
      start++;
      if (start <= target) {
        counter.textContent = start.toLocaleString();
        setTimeout(updateCounter, stepTime);
      }
    }

    updateCounter();
  }

  function resetAndAnimateAll() {
    const counters = document.querySelectorAll('.counterO');

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      if (!isNaN(target)) {
        counter.textContent = '0';
        animateCounter(counter, target);
      }
    });
  }

  resetAndAnimateAll();

  setInterval(() => {
    resetAndAnimateAll();
  }, 6000); 
});

