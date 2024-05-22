import React, { ForwardedRef } from "react";
import SelectedCharacterItem from "@components/SelectedCharacterList/SelectedCharacterItem";

interface SelectedCharacterListProps {
  selectedCharacterList: string[];
  removeSelectedCharacter: (characterId: string) => void;
  ref: ForwardedRef<HTMLLIElement>;
}

const SelectedCharacterList: React.FC<SelectedCharacterListProps> = React.forwardRef<HTMLLIElement, SelectedCharacterListProps>(
  ({ 
    selectedCharacterList, 
    removeSelectedCharacter 
  }, ref) => {

  return (
    selectedCharacterList.length > 0 && (
      <ul className="popup-content-character-list">
        {
          selectedCharacterList.map((character, index) => (
            <SelectedCharacterItem 
              key={index} 
              character={character} 
              onRemoveSelectedCharacter={() => removeSelectedCharacter(character)} 
            />
          ))
        }
        <li ref={ref} />
      </ul>
    )
  )
});


export default SelectedCharacterList;

