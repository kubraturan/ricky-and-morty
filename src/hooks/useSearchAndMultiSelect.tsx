import { useEffect, useRef, RefObject } from 'react';
import {
  useDelayedValue,
  useClickOutsideListener,
  useKeyboardEventListener
} from '@hooks/index'
import { Character } from '../types/character';
import { useAppContext } from '@providers/index';
import { API_URL } from '../configs';

export interface UseSearchAndMultiSelectReturnTypes {                        
  scrollRef?: RefObject<HTMLLIElement>;
  outsideClickRef?: RefObject<HTMLDivElement>;
}

export const useSearchAndMultiSelect = (): UseSearchAndMultiSelectReturnTypes => {
  const {
    selectedCharacterList,
    textSearchHighlighterWord,
    errorMessage,
    setCharacters,
    setLoading,
    setErrorMessage,
    setSearchCharacterEnabled,
    setIsInputFocused,
    setShowCharacters,
  } = useAppContext();

  const scrollRef = useRef<HTMLLIElement>(null);
  const outsideClickRef = useRef<HTMLDivElement>(null);
  const delayedValueSearch = useDelayedValue<string>(textSearchHighlighterWord, 500);

  useClickOutsideListener(outsideClickRef, () => {
    setSearchCharacterEnabled(false);
    setIsInputFocused(false);
    setShowCharacters(false);
  });

  useKeyboardEventListener({
    textSearchHighlighterWord,
    selectedCharacterList,
    setShowCharacters,
    setIsInputFocused,
    setSearchCharacterEnabled
  });

  useEffect(() => {
    setLoading(true);

    if (errorMessage) {
      setErrorMessage('');
    }

    const fetchCharacters = async () => {
      try {
        const response = await fetch(
          `${API_URL}/character?name=${delayedValueSearch}`
        );

        const data = await response.json();

        if (response.status === 404) {
          setErrorMessage(data.error);
          setLoading(false);
          return;
        }

        const fetchedCharacters: Character[] = data?.results?.map(
          (character: Character) => ({
            ...character,
            isChecked: false,
          })
        );
        setCharacters(fetchedCharacters);
      } catch (err: unknown) {
        let message = 'Oops! An unexpected error has disrupted your experience';
        if (err instanceof Error) {
          message = err.message;
        } else if (typeof err === 'string') {
          message = err;
        }
        setErrorMessage(message);
        setCharacters([]);
      }
      setLoading(false);
    };

    fetchCharacters();
  }, [delayedValueSearch]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedCharacterList]);

  return {
    scrollRef,
    outsideClickRef,
  };
};
