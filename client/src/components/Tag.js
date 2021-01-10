import { useState, useEffect } from 'react';
// import '../styles/tag.scss';

function Tag({ tagName, isTagActive, onTagChanged, editable }) {
  const [buttonType, setButtonType] = useState('');

  const getButtonType = () => {
    setButtonType(editable ? (isTagActive ? 'btn-blue' : 'btn-blue-outline') : 'btn-peach');
  };

  useEffect(getButtonType, [editable, isTagActive]);

  return (
    <button className={`btn-rect ${buttonType}`} onClick={() => onTagChanged(tagName)}>
      {tagName}
    </button>
  );
}

export default Tag;
