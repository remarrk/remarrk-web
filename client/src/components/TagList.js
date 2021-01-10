import Tag from './Tag';

function TagList({ editable, tags, onTagsChanged }) {
  const onTagChanged = (tag) => {
    let newTags = {};
    Object.keys(tags).forEach((tagName) => (newTags[tagName] = tag === tagName ? !tags[tagName] : tags[tagName]));
    onTagsChanged(newTags);
  };

  const renderTags = () => {
    let tagsList = [];
    for (let i = 0; i < Object.keys(tags).length; i++) {
      tagsList.push(
        <Tag
          key={i}
          tagName={Object.keys(tags)[i]}
          isTagActive={tags[i]}
          onTagChanged={onTagChanged}
          editable={editable}
        />
      );
    }
    return tagsList;
  };

  return <div>{renderTags()}</div>;
}

export default TagList;
