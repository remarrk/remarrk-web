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
    axios.post('http://localhost:3001/add-remark', { message: message, tags: Object.keys(tags) }).then((res) => {
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

  const wrapperClass = () => {
      let { editable } = props;
      return editable ? `remark-wrapper-blue` : `remark-wrapper-peach`;
  };

  const getPlaceholder = () => {
    let { editable } = props;
    return editable ? `Make someone's day...` : `Get ready for something swell ✨`;
  };

  return (
    <div>
      <div className={`remark-wrapper ${wrapperClass()}`}>
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
      <button onClick={handleClick}>{props.editable ? 'Send' : 'See another...'}</button>
    </div>
  );
}

export default Remark;
