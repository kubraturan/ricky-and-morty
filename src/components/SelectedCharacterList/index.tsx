import React, { ForwardedRef } from "react";
import SelectedCharacterItem from "@components/SelectedCharacterList/SelectedCharacterItem";
import { useSearchAndMultiSelect } from "@hooks/useSearchAndMultiSelect";

interface SelectedCharacterListProps {
  selectedCharacterList: string[];
  removeSelectedCharacter: (characterId: string) => void;
  forwardRef?: ForwardedRef<HTMLLIElement>;
}

const SelectedCharacterList: React.FC<SelectedCharacterListProps> = React.forwardRef<HTMLLIElement, SelectedCharacterListProps>(
  ({ 
    selectedCharacterList, 
    removeSelectedCharacter 
  }) => {

  const { scrollRef } = useSearchAndMultiSelect();
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
        <li ref={scrollRef} />
      </ul>
    )
  )
});


export default SelectedCharacterList;

