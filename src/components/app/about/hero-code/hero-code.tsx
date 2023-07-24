'use client';

import React from 'react';
import Typewriter from 'typewriter-effect';

import {
  CAT_DESIGNER,
  CAT_DEVELOPER,
  CAT_PAUSE,
  CODE_PAUSE,
  FRONTEND_DEVELOPER,
  WEB_DESIGNER,
} from './const';
import './hero-code.css';

export function HeroCode() {
  return (
    <div className="w-100% h-[26rem] rounded-xl bg-gray-300/50 dark:bg-gray-700/60 font-['FiraCode',_'Courier_New'] text-[0.7rem] lg:text-sm p-4 pl-8 lg:p-6 lg:pl-12 shadow af-typewriter">
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .changeDelay('natural')
            .typeString(CAT_DEVELOPER)
            .changeDelay(2)
            .pauseFor(CAT_PAUSE)
            .typeString(FRONTEND_DEVELOPER)
            .pauseFor(CODE_PAUSE)
            .deleteAll(1)
            .pauseFor(CAT_PAUSE)
            .changeDelay('natural')
            .typeString(CAT_DESIGNER)
            .changeDelay(2)
            .pauseFor(CAT_PAUSE)
            .typeString(WEB_DESIGNER)
            .pauseFor(CODE_PAUSE)
            .deleteAll(1)
            .pauseFor(CAT_PAUSE)
            .start();
        }}
        options={{
          loop: true,
        }}
      />
    </div>
  );
}
