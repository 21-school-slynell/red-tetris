/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';

type LogoProps = {
  color?: string;
};

export const Logo: FC<LogoProps> = ({ color = '#4200FF' }) => (
  <svg
    width="70"
    height="70"
    viewBox="0 0 123 127"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_207_220)">
      <path
        d="M31.3919 35.7958C29.4926 30.6099 32.1569 24.8661 37.3429 22.9667L56.1229 16.0885C61.3089 14.1892 67.0527 16.8535 68.952 22.0395L75.8302 40.8196C77.7296 46.0055 75.0652 51.7493 69.8793 53.6487L51.0992 60.5268C45.9132 62.4262 40.1694 59.7619 38.2701 54.5759L31.3919 35.7958Z"
        fill="#BB1940"
      />
      <path
        d="M73.6471 20.32C71.7478 15.134 74.4121 9.39021 79.5981 7.49085L98.3781 0.612687C103.564 -1.28667 109.308 1.37767 111.207 6.56364L118.085 25.3437C119.985 30.5297 117.32 36.2735 112.134 38.1728L93.3544 45.051C88.1684 46.9503 82.4246 44.286 80.5253 39.1L73.6471 20.32Z"
        fill="#BB1940"
      />
      <path
        d="M4.61269 93.5268C2.71333 88.3409 5.37767 82.5971 10.5636 80.6977L29.3437 73.8196C34.5297 71.9202 40.2735 74.5845 42.1728 79.7705L49.051 98.5506C50.9503 103.737 48.286 109.48 43.1 111.38L24.32 118.258C19.134 120.157 13.3902 117.493 11.4909 112.307L4.61269 93.5268Z"
        fill="#BB1940"
      />
      <path
        d="M46.8678 78.051C44.9685 72.865 47.6328 67.1212 52.8188 65.2218L71.5988 58.3437C76.7848 56.4443 82.5286 59.1087 84.4279 64.2946L91.3061 83.0747C93.2055 88.2607 90.5411 94.0045 85.3552 95.9038L66.5751 102.782C61.3891 104.681 55.6453 102.017 53.746 96.831L46.8678 78.051Z"
        fill="#BB1940"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_207_220"
        x="0"
        y="0"
        width="122.698"
        height="126.871"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_207_220"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_207_220"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
