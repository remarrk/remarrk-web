import { useState, useEffect } from 'react';
import axios from 'axios';
import TagList from './TagList';
import '../styles/remark.scss';

function Remark(props) {
  const [message, setMessage] = useState('');
  const [tags, setTags] = useState({});

  const getTags = () => {
    if (!props.editable) return;
    axios.get('http://localhost:3001/get-tags').then((res) => {
      setTags(res.data);
    });
  };

  const getRandomRemark = () => {
    axios.get('http://localhost:3001/get-random-remark').then((res) => {
      let remark = res.data;
      setMessage(remark.message);
      let newTags = {};
      remark.tags.forEach((tag) => newTags[tag] = false);
      setTags(newTags);
    });
  };

  const sendRemark = () => {
    let selectedTags = Object.keys(tags).filter(tagName => tags[tagName]);
    axios.post('http://localhost:3001/add-remark', { message: message, tags: selectedTags }).then((res) => {
      console.log("Remark added. This is where we'd clear those fields and give user feedback.");
    });
  };

  const handleClick = () => {
    if (props.editable) {
      sendRemark();
    } else {
      getRandomRemark();
    }
  };

  useEffect(getTags, [props.editable]);

  const getCurrentColor = () => {
      let { editable } = props;
      return editable ? `blue` : `peach`;
  };

  const getPlaceholder = () => {
    let { editable } = props;
    return editable ? `Make someone's day...` : `Get ready for something swell ✨`;
  };

  const getEditable = () => {
    let { editable } = props;
    return editable ? `editable` : `display`;
  };

  return (
    <div className={`remark-sides`}>
        <div className={`remark-${getEditable()}-item`}>
            <div className={`remark-wrapper remark-wrapper-${getCurrentColor()} shadow-${getCurrentColor()}`}>
                <div className={`remark-text`}>
                    <textarea
                    className="remark-input"
                    readOnly={!props.editable}
                    placeholder={`${getPlaceholder()}`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <TagList
                editable={props.editable}
                tags={tags}
                onTagsChanged={setTags}
                />
            </div>
      </div>
      <div className={`remark-${getEditable()}-item`}>
      { props.editable ? 
        <button className={`btn-circle btn-blue shadow-blue`} onClick={handleClick}>{`Send`}</button>
        : <button className={`btn-rect btn-peach shadow-peach`} onClick={handleClick}>{`See another`}</button>}
        </div>
    </div>
  );
}

export default Remark;
