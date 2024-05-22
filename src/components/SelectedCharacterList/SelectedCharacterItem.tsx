import React from "react";
import IconClose from "@assets/icons/IconClose";

interface SelectedCharacterItemProps {
  character: string;
  onRemoveSelectedCharacter: () => void;
}

const SelectedCharacterItem: React.FC<SelectedCharacterItemProps> = ({ character, onRemoveSelectedCharacter }) => {
  return (
    <li className="popup-content-character-item">
      <span>{character}</span>
      <button
        className="popup-content-character-remove-selected"
        onClick={() => {onRemoveSelectedCharacter()}}>
        <IconClose width={24} height={24} stroke="white" />
      </button>
    </li>
  );
};

export default SelectedCharacterItem;
