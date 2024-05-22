type Props = {
  text: string;
  textSearchHighlighterWord: string;
};

export default function TextSearchHighlighter({ 
  text, 
  textSearchHighlighterWord 
}: Props) {
  if (!textSearchHighlighterWord.trim()) {
    return <span className="popup-content-item-heading">{text}</span>;
  }

  const renderHighlightedText = (textSection: string, index: number) => {
    if (regex.test(textSection)) {
      return (
        <strong style={{ fontWeight: 800 }} key={index}>
          {textSection}
        </strong>
      );
    }
    return textSection;
  };
  

  const regex = new RegExp(`(${textSearchHighlighterWord})`, "gi");
  const textSections = text.split(regex);

  return (
    <span className="popup-content-item-heading">
      {textSections.map(renderHighlightedText)}
    </span>
  );
}
