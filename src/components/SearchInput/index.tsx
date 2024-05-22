import React from "react";
import SelectedCharacterList from "@components/SelectedCharacterList";
import {
  IconCaretDown,
  IconCaretUp
} from '@assets/icons';

interface SearchInputProps {
  value: string,
  selectedCharacterList: string[],
  showCharacters: boolean,
  onFocus: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeSelectedCharacter: (characterName: string) => void;
}

const SearchInput = React.forwardRef<HTMLLIElement, SearchInputProps>(
  ({
    value,
    selectedCharacterList,
    showCharacters,
    onChange,
    onFocus,
    removeSelectedCharacter
    } ) => {

    return (
      <div className="popup-content-input-container">
        <SelectedCharacterList 
          selectedCharacterList={selectedCharacterList} 
          removeSelectedCharacter={removeSelectedCharacter} 
        />
        <input
          type="text"
          value={value}
          placeholder="Type to search..."
          className="popup-content-input"
          onChange={onChange}
          onFocus={onFocus}
        />
        <>
          {
            showCharacters ?
              <IconCaretDown 
                width={16} 
                height={16} 
                stroke="#4A5567"  
                className="popup-content-caret-down-icon"
              /> 
              :
              <IconCaretUp 
                width={16} 
                height={16} 
                stroke="#4A5567" 
                className="popup-content-caret-up-icon"/> 
          }
        </>
      </div>
    );
  }
);

export default SearchInput;
