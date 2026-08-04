'use client';

import React, { useEffect, useRef } from 'react';
import { activateMagneto, resetMagneto } from '@/lib/animations';

interface MagneticEffectProps {
  children: React.ReactNode;
  divId: string;
  textId: string;
  magnetoStrengthVal?: number;
  magnetoTextStrengthVal?: number;
}

export const MagneticEffect: React.FC<MagneticEffectProps> = ({
  children,
  divId,
  textId,
  magnetoStrengthVal = 70,
  magnetoTextStrengthVal = 50,
}) => {
  const magnetoRef = useRef<HTMLElement | null>(null);
  const magnetoTextRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    magnetoRef.current = document.getElementById(divId);
    magnetoTextRef.current = document.getElementById(textId);

    const handleMouseMove = (e: MouseEvent) => {
      if (magnetoRef.current && magnetoTextRef.current) {
        activateMagneto(
          e,
          magnetoRef,
          magnetoTextRef,
          magnetoStrengthVal,
          magnetoTextStrengthVal
        );
      }
    };

    const handleMouseLeave = () => {
      if (magnetoRef.current && magnetoTextRef.current) {
        resetMagneto(magnetoRef, magnetoTextRef);
      }
    };

    if (window.innerWidth > 700) {
      magnetoRef.current?.addEventListener('mousemove', handleMouseMove);
      magnetoRef.current?.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      magnetoRef.current?.removeEventListener('mousemove', handleMouseMove);
      magnetoRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [divId, textId, magnetoStrengthVal, magnetoTextStrengthVal]);

  return <>{children}</>;
};
