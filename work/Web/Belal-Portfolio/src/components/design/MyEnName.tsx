import gsap from 'gsap';
import React, { useEffect } from 'react';

type MyEnNameProps = React.HTMLAttributes<HTMLDivElement>;

export const MyEnName: React.FC<MyEnNameProps> = (props) => {
  const letters = "BELAL Aboseada".split("");
  useEffect(() => {
    gsap.to("#my-name span", {
      y: 0,
      duration: 0.8,
      stagger: 0.04,
      ease: "power3.out",
    });
  }, []);
  return (
    <div
      className={`flex overflow-hidden text-flax-smoke-900 font-fancy font-black text-[10vw] leading-none uppercase ${props.className || ''}`}
      id={props.id}
    >
      {letters.map((char, index) => (
        <span
          key={index}
          className="will-change-auto inline-block whitespace-pre"        >
          {char === " " ? " " : char}
        </span>
      ))}
    </div>
  );
};
