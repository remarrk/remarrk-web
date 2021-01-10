import { useState, useEffect } from 'react';
import Tag from './Tag';
import '../styles/tagList.scss';

function TagList({ editable, tags, onTagsChanged }) {
  const [tagsJSX, setTagsJSX] = useState([]);

  const renderTags = () => {
    const onTagChanged = (tag) => {
      let newTags = {};
      Object.keys(tags).forEach((tagName) => (newTags[tagName] = tag === tagName ? !tags[tagName] : tags[tagName]));
      onTagsChanged(newTags);
    };

    let tagsList = [];
    for (let i = 0; i < Object.keys(tags).length; i++) {
      tagsList.push(
        <Tag
          key={i}
          tagName={Object.keys(tags)[i]}
          isTagActive={Object.values(tags)[i]}
          onTagChanged={onTagChanged}
          editable={editable}
        />
      );
    }
    setTagsJSX(tagsList);
  };

  useEffect(renderTags, [tags, editable, onTagsChanged]);

  return <div className={`tag-list`}>{tagsJSX}</div>;
}

export default TagList;
