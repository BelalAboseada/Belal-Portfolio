import React from 'react';
import { MyEnName } from './MyEnName';

export const MyName: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <>
      <h1 className="sr-only">Belal Aboseada - بلال ابوسعدة</h1>
      <h2 className="sr-only">Web Developer & Tech Content Creator</h2>

      <MyEnName id="svg-my-en-name" className={className} />
    </>
  );
};
