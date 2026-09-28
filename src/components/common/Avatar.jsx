import React, { useState } from 'react';

const sizeMap = {
  xs:   { wrapper: 'w-7 h-7',   text: 'text-[10px]' },
  sm:   { wrapper: 'w-8 h-8',   text: 'text-xs' },
  md:   { wrapper: 'w-10 h-10', text: 'text-sm' },
  lg:   { wrapper: 'w-14 h-14', text: 'text-base' },
  xl:   { wrapper: 'w-20 h-20', text: 'text-xl' },
  '2xl': { wrapper: 'w-28 h-28', text: 'text-3xl' },
};

export default function Avatar({ src, name, size = 'md', className = '', ring = false }) {
  const [imgError, setImgError] = useState(false);
  const s        = sizeMap[size] || sizeMap.md;
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  const ringClass = ring ? 'ring-2 ring-white ring-offset-1' : '';

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={name || 'Avatar'}
        className={`rounded-full object-cover flex-shrink-0 ${s.wrapper} ${ringClass} ${className}`}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      className={`
        rounded-full flex items-center justify-center font-bold flex-shrink-0
        bg-gradient-to-br from-violet-500 to-indigo-600 text-white
        ${s.wrapper} ${s.text} ${ringClass} ${className}
      `}
    >
      {initials}
    </div>
  );
}
