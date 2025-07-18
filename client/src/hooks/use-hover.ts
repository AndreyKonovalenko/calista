import { RefObject, useState, useEffect } from 'react';

export const useHover = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
): boolean => {
  const [hoverd, setHovered] = useState(false);
  useEffect(() => {
    const targetElement = ref.current;
    console.log(targetElement);
    if (!(targetElement && targetElement.addEventListener)) return;

    targetElement.addEventListener('mouseover', () => setHovered(true));
    return () => {
      targetElement.removeEventListener('mouseout', () => setHovered(false));
    };
  });
  return hoverd;
};
