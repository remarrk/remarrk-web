import React from 'react';
// import '../styles/tag.scss';

function Tag({ tagName, isTagActive, onTagChanged, editable }) {
  const getButtonType = () => {
    return editable ? (isTagActive ? 'btn-blue' : 'btn-blue-outline') : 'btn-peach';
  };

  return (
    <button className={`btn-rect ${getButtonType()}`} onClick={() => onTagChanged(tagName)}>
      {tagName}
    </button>
  );
}

export default Tag;
