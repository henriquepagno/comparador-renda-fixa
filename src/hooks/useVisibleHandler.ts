import { MutableRefObject, useEffect } from 'react';

export default function useVisibleHandler(
  ref: MutableRefObject<any>,
  handler: Function,
  modal = false
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
    document.addEventListener('click', handleClick, true);
    if (!modal) {
      document.addEventListener('mouseleave', handleClick, true);
    }
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClick, true);
      if (!modal) {
        document.removeEventListener('mouseleave', handleClick, true);
      }
    };
  });
}
