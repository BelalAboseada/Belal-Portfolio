"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const cursorXSet = gsap.quickSetter(cursor, "x", "px");
    const cursorYSet = gsap.quickSetter(cursor, "y", "px");
    const followerXSet = gsap.quickSetter(follower, "x", "px");
    const followerYSet = gsap.quickSetter(follower, "y", "px");

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.2;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      cursorXSet(e.clientX);
      cursorYSet(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);

    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      followerXSet(pos.x);
      followerYSet(pos.y);
    });

    const handleHoverEnter = () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.2 });
      gsap.to(follower, { scale: 0.5, borderColor: "#1EAEDB", duration: 0.2 });
    };

    const handleHoverLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(follower, { scale: 1, borderColor: "rgba(255,255,255,0.2)", duration: 0.2 });
    };

    const links = document.querySelectorAll("a, button, input, textarea, [role='button']");
    links.forEach(link => {
      link.addEventListener("mouseenter", handleHoverEnter);
      link.addEventListener("mouseleave", handleHoverLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      links.forEach(link => {
        link.removeEventListener("mouseenter", handleHoverEnter);
        link.removeEventListener("mouseleave", handleHoverLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#1EAEDB] rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/20 rounded-full pointer-events-none z-[99] hidden md:block"
      />
    </>
  );
}