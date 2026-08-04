'use client';

import React, { useEffect, useState } from 'react';
import { navbarLinks, socialLinks } from '@/lib/data';
import { Link } from '../common';
import { MagneticEffect } from '../common/MagneticEffect';
import moment from 'moment-timezone';
import { useLenis } from 'lenis/react';

export const Footer: React.FC = () => {
  const [myLocalTime, setMyLocalTime] = useState('');
  const [userLocalTime, setUserLocalTime] = useState('');
  const lenis = useLenis();

  const footerSections = [
    { title: 'Menu', links: navbarLinks },
    { title: 'Socials', links: socialLinks },

  ];

  useEffect(() => {
    const updateTimes = () => {
      setMyLocalTime(moment.tz('Asia/Aden').format('h:mm:ss a'));
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setUserLocalTime(moment.tz(userTimeZone).format('h:mm:ss a'));
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative flex flex-col items-center justify-center gap-20 p-[2%]">
      <div className="grid w-full grid-cols-2 text-base sm:gap-x-6 md:grid-cols-12">
        {footerSections.map((section) => (
          <div
            key={section.title}
            className={`flex flex-col md:col-span-3 ${section.title === 'Menu' ? 'md:col-span-6' : ''}`}
          >
            <p className="heading-5 border-flax-smoke-400 w-full border-b pb-2 font-bold">
              {section.title}
            </p>
            <div className="mt-2 space-y-1">
              {section.links.map((link) => (
                <div key={link.label} className="heading-6">
                  <Link
                    className="font-medium tracking-wider lowercase"
                    label={link.label}
                    url={link.url}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid w-full grid-cols-12">
        <div className="col-span-7 place-content-center md:col-span-6">
          <h6 className="heading-4 sm:heading-2 leading-none font-bold">
            © {new Date().getFullYear()} Huy <br />
            All rights reserved.
          </h6>
        </div>

        <div className="col-span-5 place-content-center max-sm:place-content-end md:col-span-3">
          <p className="heading-6 font-bold uppercase">Belal&apos;s Local time</p>
          <p className="heading-6">{myLocalTime}</p>
          <p className="heading-6 font-bold uppercase">Your Local time</p>
          <p className="heading-6">{userLocalTime}</p>
        </div>

        <div className="hidden md:col-span-2 md:col-start-11 md:block lg:col-span-1 lg:col-start-12">
          <MagneticEffect divId="scroll-to-top" textId="scroll-to-top-icon">
            <div
              onClick={() => lenis?.scrollTo('#app', { duration: 2 })}
              id="scroll-to-top"
              className="flex-center bg-flax-smoke-400 size-20 cursor-pointer flex-col rounded-full"
            >
              <svg
                className="size-1/2"
                id="scroll-to-top-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
              >
                <path
                  d="M12 4L12 20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.9998 8.99996C16.9998 8.99996 13.3174 4.00001 11.9998 4C10.6822 3.99999 6.99982 9 6.99982 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </MagneticEffect>
        </div>
      </div>
    </footer>
  );
};
