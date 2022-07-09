import { MutableRefObject, useEffect } from 'react';

export default function useVisibleHandler(
  ref: MutableRefObject<any>,
  handler: Function,
  modal = false,
  closeOnClickOutside = false
) {
  const handleHideDropdown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handler();
    }
  };

  const handleClick = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target)) {
      handler();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true);
    closeOnClickOutside &&
      document.addEventListener('mousedown', handleClick, true);

    if (!modal) {
      document.addEventListener('mouseleave', handleClick, true);
    }

    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);

      closeOnClickOutside &&
        document.removeEventListener('mousedown', handleClick, true);
      if (!modal) {
        document.removeEventListener('mouseleave', handleClick, true);
      }
    };
  });
}
