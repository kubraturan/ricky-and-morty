import React from "react";
import TextSearchHighlighter from "@components/TextSearchHighlighter";
import { Character } from "../../types/character";
import { useAppContext } from "@providers/index";

interface PopupContentItemProps {
  index: number;
  character: Character;
}

const PopupContentItem: React.FC<PopupContentItemProps> = ({
  index,
  character,
}) => {
  const {
    textSearchHighlighterWord,
    focusedCharacterIndex,
    searchCharacterEnabled,
    handleCheck
  } = useAppContext();

  const isItemFocused = searchCharacterEnabled && focusedCharacterIndex === index;

  return (
    <label className={`popup-content-item ${isItemFocused && "item-focused"}`}>
      <input
        type="checkbox"
        checked={character.isChecked}
        onChange={() => handleCheck(character.id, index)}
      />
      <img src={character.image} alt={character.name} />
      <div>
        <TextSearchHighlighter 
          text={character.name} 
          textSearchHighlighterWord={textSearchHighlighterWord} 
        />
        <p className="popup-content-info-text">
          {character.episode.length} Episodes
        </p>
      </div>
    </label>
  );
};

export default PopupContentItem;
