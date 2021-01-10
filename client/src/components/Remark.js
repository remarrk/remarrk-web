import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TagList from './TagList';
import '../styles/remark.scss';

function Remark(props) {
  const [message, setMessage] = useState('');
  const [tags, setTags] = useState({});
  const [empty, setEmpty] = useState(true);
  const [latest, setLatest] = useState({ lat_message: ' ', lat_status: false });
  // const [error, setError] = useState(""})
  let btnref_send = useRef();
  let btnref_get = useRef();

  const getTags = () => {
    if (!props.editable) return;
    axios.get('http://localhost:3001/get-tags').then((res) => {
      setTags(res.data);
    });
  };

  const getRandomRemark = () => {
    btnref_get.current.setAttribute('disabled', 'disabled');
    axios.get('http://localhost:3001/get-random-remark').then((res) => {
      // console.log(res.status)
      let remark = res.data;
      setMessage(remark.message);
      let newTags = {};
      remark.tags.forEach((tag) => (newTags[tag] = false));
      setTags(newTags);
      if (res.status === 200) {
        btnref_get.current.removeAttribute('disabled');
      }
    });
  };

  const sendRemark = () => {
    if (latest.lat_message === message) {
      console.log(latest, 'same message added');
      setLatest({ ...latest, lat_status: true });
    } else {
      btnref_send.current.setAttribute('disabled', 'disabled');
      let selectedTags = Object.keys(tags).filter((tagName) => tags[tagName]);
      axios.post('http://localhost:3001/add-remark', { message: message, tags: selectedTags }).then((res) => {
        // console.log("Remark added. This is where we'd clear those fields and give user feedback.");
        // console.log(res.status)
        // console.log(res.status)
        if (res.status === 200) {
          btnref_send.current.removeAttribute('disabled');
          setLatest({ lat_message: message, lat_status: true });
          setMessage('');
          // console.log(latest)
        }
      });
      // }
    }
  };

  const handleClick = (e) => {
    // console.log(btnref_send.current || btnref_get.current)
    if (btnref_send.current || btnref_get.current) {
      // console.log(!empty)
      if (props.editable & !empty) {
        sendRemark();
      } else if (!props.editable) {
        getRandomRemark();
      }
    }
  };
  const setempty = useEffect(() => {
    // console.log(message)
    if (message.trim() === '') {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [message]);

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
              className='remark-input'
              maxLength='115'
              readOnly={!props.editable}
              placeholder={`${getPlaceholder()}`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className={`remark-tags`}>
            <TagList editable={props.editable} tags={tags} onTagsChanged={setTags} />
          </div>
        </div>
      </div>
      <div className={`remark-${getEditable()}-item`}>
        {props.editable ? (
          <button
            ref={btnref_send}
            className={`btn-circle btn-blue shadow-blue`}
            onClick={handleClick}
          >{`Send`}</button>
        ) : (
          <button
            ref={btnref_get}
            className={`btn-rect btn-peach shadow-peach`}
            onClick={handleClick}
          >{`See another`}</button>
        )}
      </div>
    </div>
  );
}

export default Remark;
