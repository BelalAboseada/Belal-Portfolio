'use client';

import React, { useEffect, useState, useRef } from 'react';
import { BurgerMenuBtn } from './BurgerMenuBtn';
import { Link } from './Link';
import { MagneticEffect } from './MagneticEffect';
import { Button } from './Button';
import { Circles } from '../design/Circles';

import {
  animateNavbarEnter,
  animateNavbarLeave,
  navbarScale,
} from '@/lib/animations';
import { navbarLinks, navLinks, socialLinks } from '@/lib/data';
import { useLenis } from 'lenis/react';
import { cn } from '@/lib/utils';

export const Nav: React.FC<{ className?: string }> = ({ className }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const lenis = useLenis();
  const navbarRef = useRef<HTMLDivElement>(null);

  const toggleBtnClickAnimation = () => {
    const newState = !isNavbarOpen;
    setIsNavbarOpen(newState);

    document.getElementById('magneto')?.classList.toggle('active');

    const x = navbarRef.current;
    if (newState) {
      animateNavbarEnter('#navbar', '#navLinks li a', '.contact');
      x?.focus();
      lenis?.stop();
    } else {
      animateNavbarLeave('#navbar', '#navLinks li a', '.contact');
      x?.blur();
      lenis?.start();
    }
  };

  const gotoSectionLocal = (url: string) => {
    lenis?.start();
    lenis?.scrollTo(url, { duration: 3 });
    toggleBtnClickAnimation();
  };

  useEffect(() => {
    navbarScale('#burger', '#hero');
  }, []);

  return (
    <>
      <BurgerMenuBtn
        onClick={toggleBtnClickAnimation}
        className="z-[9999] scale-0 drop-shadow-lg"
        id="burger"
      />

      <div
        onClick={toggleBtnClickAnimation}
        className={cn(
          "fixed inset-0 z-[9998] size-full bg-black opacity-50 select-none",
          !isNavbarOpen && "hidden"
        )}
      ></div>

      <div
        tabIndex={0}
        id="navbar"
        ref={navbarRef}
        onKeyDown={(e) => {
          if (e.key === 'Escape') toggleBtnClickAnimation();
        }}
        className="bg-flax-smoke-950 fixed top-[1dvh] right-0 z-[9998] h-[98dvh] w-full translate-x-full rounded-s-lg p-5 will-change-auto select-none focus:outline-hidden max-md:w-[98%] sm:p-10 md:w-3/5 md:px-20 lg:w-2/5"
      >
        <Circles id="circles" className="absolute top-0 right-0 opacity-25" />
        <div className="flex h-full flex-col items-center justify-between">
          <div className="relative z-10 w-full">
            <ul
              className="heading-2 text-flax-smoke-50 mt-12 font-bold md:mt-24"
              id="navLinks"
            >
              {navbarLinks.map((l) => (
                <li
                  className="overflow-y-clip"
                  key={l.label}
                  id={l.label}
                >
                  <a
                    href={l.url}
                    onClick={(e) => {
                      e.preventDefault();
                      gotoSectionLocal(l.url);
                    }}
                    className="group my-2 flex h-full w-fit translate-y-full cursor-pointer items-center justify-start leading-none will-change-auto"
                  >
                    <span className="bg-flax-smoke-50 h-4 w-4 scale-0 rounded-full opacity-0 transition-all duration-300 ease-in-out group-hover:scale-100 group-hover:opacity-100"></span>
                    <p className="font-fancy -translate-x-5 transition-all duration-300 ease-in-out group-hover:translate-x-5">
                      {l.label}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full">
            <div className="text-flax-smoke-50 mt-2 h-full font-normal">
              {/* Email removed as no email provided */}
              <div className="mt-6 flex flex-wrap justify-start gap-1">
                {socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    className="contact border-flax-smoke-600 border opacity-0"
                    label={social.label}
                    url={social.url}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "padding-x absolute inset-0 z-20 h-fit -translate-y-full pt-6 will-change-auto",
          className
        )}
      >
        <nav className="flex justify-between">
          <MagneticEffect
            magnetoStrengthVal={20}
            magnetoTextStrengthVal={10}
            divId="name-container"
            textId="name"
          >
            <div id="name-container" className="group -m-10 h-fit cursor-pointer p-10">
              <h2
                id="name"
                className="font-fancy flex items-start text-xl font-extrabold uppercase md:text-3xl"
              >
                belal
                <span className="font-fancy inline! origin-center! text-xl transition-transform duration-500 ease-in-out group-hover:rotate-[360deg]">
                  &copy;
                </span>
              </h2>
            </div>
          </MagneticEffect>

          <div className="flex justify-start">
            <p className="heading-6 font-fancy text-flax-smoke-400 hidden font-bold uppercase select-none md:block">
              {/* available for freelancers <br />
              work and collaboration */}
              developer by day  <br />
              creator by night
            </p>
          </div>
          <div className="flex">
            <ul className="w-full flex-1 gap-1 overflow-y-hidden text-lg font-medium md:flex md:gap-2 md:text-xl lg:gap-4 lg:text-2xl xl:text-3xl">
              {navLinks.map((l, index) => (
                <Link
                  key={l.label}
                  tag="li"
                  label={l.label + (index !== navLinks.length - 1 ? ',' : '')}
                  url={l.url}
                />
              ))}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};
