import { useEffect } from 'preact/hooks';

export const KeyboardShortcut = ({ alt = false, command = false, control = false, matchKey, onTrigger, shift = false }) => {
  useEffect(() => {
    const onKeyPress = (event) => {
      if (event.metaKey === command && event.altKey === alt && event.ctrlKey === control && event.shiftKey === shift && event.key === matchKey) {
        onTrigger();
      }
    };

    document.addEventListener('keypress', onKeyPress, false);

    return () => {
      document.removeEventListener('keypress', onKeyPress, false);
    };
  }, [matchKey, onTrigger]);

  return null;
};

export default KeyboardShortcut;
