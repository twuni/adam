import { useEffect } from 'preact/hooks';

export const KeyboardShortcut = ({ matchKey, onTrigger }) => {
  useEffect(() => {
    const onKeyPress = (event) => {
      if (event.ctrlKey && event.key === matchKey) {
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
