import React, { FC } from 'react';

type LogoProps = {
  color?: string;
};

export const Logo: FC<LogoProps> = ({ color = '#4200FF' }) => (
  <svg width="171" height="72" viewBox="0 0 171 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="36" cy="36" r="36" fill={color} fillOpacity="0.05" />
    <circle cx="90" cy="36" r="36" fill={color} fillOpacity="0.35" />
    <circle cx="63" cy="36" r="36" fill={color} fillOpacity="0.2" />
    <circle cx="45" cy="36" r="36" fill={color} fillOpacity="0.1" />
    <circle cx="99" cy="36" r="36" fill={color} fillOpacity="0.4" />
    <circle cx="72" cy="36" r="36" fill={color} fillOpacity="0.25" />
    <circle cx="54" cy="36" r="36" fill={color} fillOpacity="0.15" />
    <circle cx="108" cy="36" r="36" fill={color} fillOpacity="0.45" />
    <circle cx="117" cy="36" r="36" fill={color} fillOpacity="0.5" />
    <circle cx="126" cy="36" r="36" fill={color} fillOpacity="0.55" />
    <circle cx="135" cy="36" r="36" fill={color} />
    <circle cx="81" cy="36" r="36" fill={color} fillOpacity="0.3" />
  </svg>
);
