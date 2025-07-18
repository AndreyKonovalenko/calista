import { RefObject, useState, useEffect } from 'react';

export const useHover = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
): boolean => {
  const [hoverd, setHovered] = useState<boolean>(false);
  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
  useEffect(() => {
    const targetElement = ref.current;
    if (!(targetElement && targetElement.addEventListener)) return;
    targetElement.addEventListener('mouseenter', handleMouseEnter);
    targetElement.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      targetElement.removeEventListener('mouseenter', handleMouseLeave);
      targetElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return hoverd;
};
