import { useAppContext } from '@providers/index';
import { useEffect } from 'react';

export interface useKeyboardEventListenerProps {                        
  textSearchHighlighterWord: string,
  selectedCharacterList: string[],
  setShowCharacters:(showCharacters: boolean) => void,
  setIsInputFocused:(inputFocus: boolean) => void,
  setSearchCharacterEnabled:(characterEnabled: boolean) => void
}

const useKeyboardEventListener = ({
  textSearchHighlighterWord,
  selectedCharacterList,
  setShowCharacters,
  setIsInputFocused,
  setSearchCharacterEnabled
}: useKeyboardEventListenerProps) => {
  const {
    characters,
    focusedCharacterIndex,
    setFocusedCharacterIndex,
    removeSelectedCharacter,
    handleCheck,
  } = useAppContext();

  useEffect(() => {
    const getFocusedAndScroll = (focusedItem: Element | null) => (callback: () => void) => {
      setSearchCharacterEnabled(true);
      callback();
      focusedItem?.scrollIntoView();
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      const focusedItem = window.document.querySelector('.item-focused');
      const handleFocusAndScroll = getFocusedAndScroll(focusedItem);

      switch (event.key) {
        case 'Backspace':
          if (textSearchHighlighterWord === '' && selectedCharacterList.length > 0) {
            const selectedCharacterListCopy = [...selectedCharacterList];
            removeSelectedCharacter(selectedCharacterListCopy[selectedCharacterListCopy.length - 1]);
          }
          break;
        case 'Escape':
          setFocusedCharacterIndex(null);
          setSearchCharacterEnabled(false);
          setIsInputFocused(false);
          setShowCharacters(false);
          break;
        case 'ArrowUp':
          handleFocusAndScroll(() =>
            setFocusedCharacterIndex((prevIndex) =>
              prevIndex !== null ? (prevIndex > 0 ? prevIndex - 1 : characters.length - 1) : characters.length - 1
            )
          );
          break;
        case 'ArrowDown':
        case 'Tab':
          handleFocusAndScroll(() =>
            setFocusedCharacterIndex((prevIndex) =>
              prevIndex === null ? 0 : (prevIndex + 1) % characters.length
            )
          );
          break;
        case 'Enter':
          if (focusedCharacterIndex !== null) {
            const characterId = characters[focusedCharacterIndex]?.id;
            if (characterId !== undefined) {
              handleCheck(characterId, focusedCharacterIndex);
            }
          }
          break;
        default:
          break;
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Tab') {
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [characters, focusedCharacterIndex]);
};

export default useKeyboardEventListener;
