import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TagList from './TagList';
import '../styles/remark.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from './ErrorMessage';

function Remark(props) {
  const [message, setMessage] = useState('');
  const [tags, setTags] = useState({});
  const [error, setError] = useState({ empty: null, lat_message: '', lat_status: false, message: '' });
  const [isError, setIsError] = useState(false);

  let btnref_send = useRef();
  let btnref_get = useRef();

  const setErrorIfEditable = (newError) => {
      if(props.editable) {
          setError(newError);
          setIsError(true);
  }};

  const onTextChange = (message) => {
        if (error.empty !== null) {
     setErrorIfEditable((prev) => ({ ...prev, empty: null, message: '' }));
        }
        setMessage(message);
  };

  const getTags = () => {
    if (!props.editable) return;
    axios.get('http://localhost:3001/get-tags').then((res) => {
      setTags(res.data);
    });
  };

  const getRandomRemark = () => {
    btnref_get.current.setAttribute('disabled', 'disabled');
    axios.get('http://localhost:3001/get-random-remark').then((res) => {
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
    if (error.lat_message === message) {
      console.log(error.lat_message, 'same message added');
     setErrorIfEditable({ ...error, lat_status: true });
    } else {
      btnref_send.current.setAttribute('disabled', 'disabled');
      let selectedTags = Object.keys(tags).filter((tagName) => tags[tagName]);
      axios.post('http://localhost:3001/add-remark', { message: message, tags: selectedTags }).then((res) => {
        console.log("Remark added. This is where we'd clear those fields and give user feedback.");
  
        if (res.status === 200) {
            btnref_send.current.removeAttribute('disabled');
            setErrorIfEditable({ ...error, lat_message: message, lat_status: true });
            setMessage('');
        }
      });
    }
  };

  const handleClick = (e) => {
    if (message.trim() === '' && props.editable) {
     setErrorIfEditable((prev) => ({ ...prev, empty: true, message: `You can't send an empty remark!` }));
      return;
    }

    if (btnref_send.current || btnref_get.current) {
      if (props.editable & !error.empty) {
        sendRemark();
      } else if (!props.editable) {
        getRandomRemark();
      }
    }
  };

  const clearMessageIfEditable = () => {
      if(props.editable) setMessage('');
      else getRandomRemark();
  }

  useEffect(getRandomRemark, []);
  useEffect(clearMessageIfEditable, [props.editable])
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

  const removeError = () => {
      console.log('boop');
      setError(prev => {
          prev.empty = false;
          prev.message = '';
          return prev;
      })

      setIsError(false)
      console.log(error);
  };

  return (
    <div className={`remark-sides`}>
    {isError && <ErrorMessage error={error} editable={props.editable} setEmpty={removeError}/>}
      <div className={`remark-${getEditable()}-item`}>
        <div className={`remark-wrapper remark-wrapper-${getCurrentColor()} shadow-${getCurrentColor()}`}>
          <div className={`remark-text`}>
            <textarea
              className='remark-input'
              readOnly={!props.editable}
              placeholder={`${getPlaceholder()}`}
              value={message}
              onChange={(e) => onTextChange(e.target.value)}
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
            className={`btn-circle btn-blue shadow-blue btn-icon`}
            onClick={handleClick}
          ><FontAwesomeIcon className={`btn-icon`} icon={faArrowRight} /></button>
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
