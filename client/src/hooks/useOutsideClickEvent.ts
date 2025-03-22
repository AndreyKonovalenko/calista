import { RefObject, useEffect, useCallback } from 'react';

export const useOutsideEClickEvent = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T> | RefObject<T>[],
  handler: () => void,
) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent | TouchEvent | FocusEvent) => {
      const target = event?.target as Node;
      if (!target || !target.isConnected) {
        return;
      }
      const isOutSide = Array.isArray(ref)
        ? ref
            .filter(r => Boolean(r.current))
            .every(r => r.current && !r.current.contains(target))
        : ref.current && !ref.current.contains(target);

      if (isOutSide) {
        handler();
      }
    },
    [handler],
  );
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler]);
};
