import React from "react";
import {
  Loading,
  PopupContentItem
} from '@components/index'
import { UseSearchAndMultiSelectReturnTypes } from "@hooks/useSearchAndMultiSelect";
import { useAppContext } from "@providers/index";

interface PopupContentProps extends UseSearchAndMultiSelectReturnTypes {}

const EmptyList = () => {
  return <div>No results found</div>;
};

const ErrorMessage = ({ message }: { message: string }) => {
  return <span className="popup-content-error-message">{message}</span>;
};

const PopupContent = React.forwardRef<HTMLLIElement, PopupContentProps>(() => {
    const {
      characters,
      loading,
      errorMessage,
      isInputFocused,
    } = useAppContext();

    const isResultEmpty = characters?.length === 0;
    const showData = !errorMessage && !loading;
    const showError = errorMessage;
    const showEmptyList = !errorMessage && !loading && isResultEmpty;

    return (
      isInputFocused &&
      <div className="popup-content-list">
        {loading && <Loading />}
        {
          showData &&
          characters.map((character, index) => (
            <PopupContentItem
              key={character.id}
              character={character}
              index={index}
            />
          ))
        }
        {showEmptyList && <EmptyList />}
        {showError && <ErrorMessage message={errorMessage} />}
      </div>
    );
  }
);

export default PopupContent;
