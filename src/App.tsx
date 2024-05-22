import React from "react";
import {
  PopupContent,
  SearchInput
} from '@components/index'
import { useSearchAndMultiSelect } from "@hooks/useSearchAndMultiSelect";
import { useAppContext } from "@providers/index";
import '@styles/App.css'

const App: React.FC = () => {
  const { outsideClickRef } = useSearchAndMultiSelect();
  const {
    textSearchHighlighterWord,
    showCharacters,
    selectedCharacterList,
    setIsInputFocused,
    setTextSearchHighlighterWord,
    setShowCharacters,
    removeSelectedCharacter
  } = useAppContext();

  return (
    <div className="App">
      <main className="app-container">
        <h1 className="heading">Rick & Morty</h1>
        <div className="popup-content" ref={outsideClickRef}>
          <SearchInput
            value={textSearchHighlighterWord}
            selectedCharacterList={selectedCharacterList}
            showCharacters={showCharacters}
            onChange={(e) => setTextSearchHighlighterWord(e.target.value)}
            onFocus={() => {
              setIsInputFocused(true);
              setShowCharacters(true);
            }} 
            removeSelectedCharacter={removeSelectedCharacter}
          />
          <PopupContent/> 
        </div>
      </main>
    </div>
  );
};

export default App;
