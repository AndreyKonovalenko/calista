import { useEffect, useCallback, KeyboardEvent } from 'react';

const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keyup';

type TDocumet = {
  removeEventListener(
    type: 'keyup',
    listener: (event: KeyboardEvent) => void,
    options?: boolean | EventListenerOptions,
  ): void;
  addEventListener(
    type: 'keyup',
    listener: (event: KeyboardEvent) => void,
    options?: boolean | EventListenerOptions,
  ): void;
};

export const useEscapeKey = (handleCloseModal: () => void): void => {
  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === KEY_NAME_ESC) {
        handleCloseModal();
      }
    },
    [handleCloseModal],
  );

  useEffect(() => {
    (document as TDocumet).addEventListener(
      KEY_EVENT_TYPE,
      handleEscKey,
      false,
    );
    return () => {
      (document as TDocumet).removeEventListener(
        KEY_EVENT_TYPE,
        handleEscKey,
        false,
      );
    };
  }, [handleEscKey]);
};
