'use client';

import React, { useEffect, useState, useRef } from 'react';
import { BurgerMenuBtn } from './BurgerMenuBtn';
import { Link } from './Link';
import NextLink from 'next/link';
import { MagneticEffect } from './MagneticEffect';
import { Button } from './Button';
import { Circles } from '../design/Circles';
import { Logo } from '../design/Logo';
import dynamic from 'next/dynamic';

import {
  animateNavbarEnter,
  animateNavbarLeave,
  navbarScale,
} from '@/lib/animations';
import { navbarLinks, navLinks, socialLinks } from '@/lib/data';
import { useLenis } from 'lenis/react';
import { cn } from '@/lib/utils';

// Client-only: lottie-web touches the DOM at import time.
const BMark = dynamic(() => import('../design/BMark').then((m) => m.BMark), {
  ssr: false,
});

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
      {/* Below lg the burger is the only navigation, so it stays visible from
          the top; on desktop it scales in once the hero has scrolled past. */}
      <BurgerMenuBtn
        onClick={toggleBtnClickAnimation}
        className="z-[9999] scale-100 drop-shadow-lg lg:scale-0"
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
        /* Lenis is stopped while the menu is open, which also swallows touch
           gestures — this opts the panel out so it can still scroll itself. */
        data-lenis-prevent
        onKeyDown={(e) => {
          if (e.key === 'Escape') toggleBtnClickAnimation();
        }}
        className="bg-flax-smoke-950 fixed top-[calc(1dvh_+_var(--safe-top))] right-0 z-[9998] flex h-[calc(98dvh_-_var(--safe-top)_-_var(--safe-bottom))] w-full translate-x-full flex-col overflow-y-auto overscroll-contain rounded-s-lg p-5 will-change-auto select-none focus:outline-hidden max-md:w-[98%] sm:p-10 md:w-3/5 md:px-20 lg:w-2/5"
      >
        <Circles id="circles" className="absolute top-0 right-0 opacity-25" />
        <div className="flex min-h-full flex-1 flex-col items-center justify-between gap-10">
          <div className="relative z-10 w-full">
            {/* Sized against the viewport height as well as its width so the
                seven links never push the footer out of the panel. */}
            <ul
              className="text-flax-smoke-50 mt-10 text-[clamp(1.95rem,6.5dvh,3.55rem)] font-bold md:mt-16"
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
                      if (l.url.startsWith('#')) {
                        e.preventDefault();
                        gotoSectionLocal(l.url);
                      }
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

          <div className="w-full shrink-0">
            <div className="text-flax-smoke-50 font-normal">
              <Logo
                variant="horizontal"
                tagline
                className="text-flax-smoke-100 text-sm md:text-base"
              />
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
          "padding-x absolute inset-0 z-20 h-fit -translate-y-full pt-[calc(1.5rem_+_var(--safe-top))] will-change-auto",
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
            <NextLink
              href="/"
              id="name-container"
              aria-label="Belal Aboseada — home"
              className="group -m-10 block h-fit shrink-0 cursor-pointer p-10"
            >
              <h2 id="name" className="flex items-center text-2xl lg:text-3xl">
                <BMark
                  variant="intro"
                  size={40}
                  className="transition-transform duration-500 ease-in-out group-hover:-rotate-6"
                />
                <span className="sr-only">Belal Aboseada</span>
              </h2>
            </NextLink>
          </MagneticEffect>

          <div className="hidden shrink-0 justify-start lg:flex">
            <p className="heading-6 font-fancy text-flax-smoke-400 font-bold uppercase select-none">
              {/* available for freelancers <br />
              work and collaboration */}
              developer by day  <br />
              creator by night
            </p>
          </div>
          {/* Desktop only — below lg the burger menu is the navigation. */}
          <div className="hidden shrink-0 lg:flex">
            <ul className="flex w-full flex-1 gap-1 overflow-y-hidden text-lg font-medium md:gap-2 md:text-xl lg:gap-4 lg:text-2xl xl:text-3xl">
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
