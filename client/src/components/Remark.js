import { useState, useEffect } from 'react';
import axios from 'axios';
import TagList from './TagList';

function Remark(props) {
  const [message, setMessage] = useState('');
  const [tags, setTags] = useState({});

  const getTags = () => {
    if (!props.editable) return;
    axios.get('http://localhost:3001/get-tags').then((res) => {
      console.log(res.data);
      setTags(res.data);
    });
  };

  const getRandomRemark = () => {
    axios.get('http://localhost:3001/get-random-remark').then((res) => {
      let remark = res.data;
      setMessage(remark.message);
      setTags(remark.tags);
    });
  };

  const sendRemark = () => {
    axios.post('http://localhost:3001/add-remark', { message: message, tags: tags }).then((res) => {
      console.log("Remark added. This is where we'd clear those fields and give user feedback.");
      console.log(res.data);
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
  useEffect(() => console.log("yo"), [tags]);

  return (
    <div>
      <div>
        <input
          readOnly={!props.editable}
          placeholder={"Make someone's day..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
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
