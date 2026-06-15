'use client';

import React, { useEffect, useState } from 'react';

export const SamsungError: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isSamsungBrowser =
      typeof navigator !== 'undefined' && /samsung/i.test(navigator.userAgent);
    if (isSamsungBrowser) {
      setIsVisible(true);
    }
  }, []);

  const handleClick = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      id="samsung-error-modal"
      className="flex fixed inset-0 z-[50] items-center justify-center h-[100dvh] w-[100dvw] bg-black/75"
    >
      <div className="z-[50] mx-auto flex h-1/2 w-11/12 flex-col items-center justify-center rounded-lg bg-white p-5 shadow-sm md:w-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="inline-block rounded-full bg-yellow-50 p-4">
            <svg
              className="h-12 w-12 fill-current text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
            </svg>
          </div>
          <h2 className="mt-2 font-semibold text-gray-800">
            It seems you&apos;re using the <b>Samsung Internet Browser</b>.
          </h2>
          <p className="mt-2 w-full text-start text-sm leading-relaxed text-gray-600">
            Some features might not work as expected. To fix it, please follow
            the steps below:
          </p>
          <br />
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
            <span>→</span>
            <i className="mx-1">Labs</i>
            <span>→</span>
            <i className="mx-1">Enable &lsquo;Use website dark theme&rsquo;</i>
          </div>
          <p className="mt-3 text-xl font-bold">Then reload the page.</p>
        </div>

        <div className="mt-3 flex w-full items-center">
          <button
            onClick={handleClick}
            className="flex-1 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
