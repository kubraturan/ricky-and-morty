import { createContext, ReactNode, useContext, useState, Dispatch, SetStateAction } from 'react';
import { Character } from '../types/character';

interface IAppContext {
  characters: Character[];
  loading: boolean;
  selectedCharacterList: string[];
  textSearchHighlighterWord: string;
  errorMessage: string;
  searchCharacterEnabled: boolean;
  focusedCharacterIndex: number | null;
  isInputFocused: boolean;
  showCharacters: boolean;

  setCharacters: Dispatch<SetStateAction<Character[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSelectedCharacterList: Dispatch<SetStateAction<string[]>>;
  setTextSearchHighlighterWord: Dispatch<SetStateAction<string>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  setSearchCharacterEnabled: Dispatch<SetStateAction<boolean>>;
  setFocusedCharacterIndex: Dispatch<SetStateAction<number | null>>;
  setIsInputFocused: Dispatch<SetStateAction<boolean>>;
  setShowCharacters: Dispatch<SetStateAction<boolean>>;

  removeSelectedCharacter: (characterName: string) => void;
  handleCheck: (id: number, index: number) => void;
}

const AppContext = createContext<IAppContext>({
  characters: [],
  loading: false,
  selectedCharacterList: [],
  textSearchHighlighterWord: "",
  errorMessage: "",
  searchCharacterEnabled: false,
  focusedCharacterIndex: null,
  isInputFocused: false,
  showCharacters: false,
  setCharacters: () => {},
  setLoading: () => {},
  setSelectedCharacterList: () => {},
  setTextSearchHighlighterWord: () => {},
  setErrorMessage: () => {},
  setSearchCharacterEnabled: () => {},
  setFocusedCharacterIndex: () => {},
  setIsInputFocused: () => {},
  setShowCharacters: () => {},
  removeSelectedCharacter: () => {},
  handleCheck: () => {}
});


const AppProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCharacterList, setSelectedCharacterList] = useState<string[]>([]);
  const [textSearchHighlighterWord, setTextSearchHighlighterWord] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [searchCharacterEnabled, setSearchCharacterEnabled] = useState<boolean>(false);
  const [focusedCharacterIndex, setFocusedCharacterIndex] = useState<number | null>(
    -1
  );
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [showCharacters, setShowCharacters] = useState<boolean>(false);

  const removeSelectedCharacter = (characterName: string) => {
    setSelectedCharacterList(prevList => prevList.filter(character => character !== characterName));
    const newCharacters = characters?.map(character => {
      if (character.name === characterName) {
        character.isChecked = false;
      }
      return character;
    });
    setCharacters(newCharacters);
  };

  const handleCheck = (id: number, index: number) => {
    const newCharacters = characters?.map((character) => {
      if (character.id === id) {
        character.isChecked = !character.isChecked;
        if (character.isChecked) {
          setSelectedCharacterList([...selectedCharacterList, character.name]);
        } else {
          setSelectedCharacterList(selectedCharacterList.filter((selectedCharacter) => selectedCharacter !== character.name));
        }
      }
      return character;
    });
    setCharacters(newCharacters);
    setFocusedCharacterIndex(index);
  };

  return (
    <AppContext.Provider
      value={{
        characters,
        loading,
        selectedCharacterList,
        textSearchHighlighterWord,
        errorMessage,
        searchCharacterEnabled,
        focusedCharacterIndex,
        isInputFocused,
        showCharacters,
        setCharacters,
        setLoading,
        setSelectedCharacterList,
        setTextSearchHighlighterWord,
        setErrorMessage,
        setSearchCharacterEnabled,
        setFocusedCharacterIndex,
        setIsInputFocused,
        setShowCharacters,
        removeSelectedCharacter,
        handleCheck
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
