import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

export const initGSAP = () => {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(this: HTMLAnchorElement, e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: targetElement, offsetY: 0 },
            ease: "power3.inOut"
          });
        }
      });
    });
  }
};

/**
 * Splits text content of an element into individual spans wrapping each character.
 * Preserves spaces as space characters in their own spans.
 */
export const splitTextIntoSpans = (element: HTMLElement | null): HTMLSpanElement[] => {
  if (!element) return [];
  
  const text = element.innerText;
  element.innerHTML = '';
  
  const chars: HTMLSpanElement[] = [];
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const span = document.createElement('span');
    
    // Maintain whitespace layout
    if (char === ' ') {
      span.innerHTML = '&nbsp;';
    } else {
      span.innerText = char;
    }
    
    // Fix inline-block display to allow transforms
    span.style.display = 'inline-block';
    
    element.appendChild(span);
    chars.push(span);
  }
  
  return chars;
};
