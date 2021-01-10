import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TagList from './TagList';
import '../styles/remark.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ErrorMessage from './ErrorMessage';
import { faArrowRight, faArrowUp, faArrowDown, faStar } from '@fortawesome/free-solid-svg-icons';

function Remark(props) {
  const [message, setMessage] = useState('');
  const [tags, setTags] = useState({});
  const [error, setError] = useState({ empty: null, lat_message: '', lat_status: false, message: '' });
  const [isError, setIsError] = useState(false);
  const [id, setId] = useState(null);
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
      let remarkData = res.data.remarkData;
      setMessage(remarkData.message);
      let newTags = {};
      remarkData.tags.forEach((tag) => (newTags[tag] = false));
      setTags(newTags);
      if (res.status === 200) {
        btnref_get.current.removeAttribute('disabled');
        setId(res.data.remarkId);
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
        if (res.status === 200) {
            btnref_send.current.removeAttribute('disabled');
            setErrorIfEditable({ ...error, lat_message: message, lat_status: true });
            setMessage('');
        }

        setTags(prev => {
            console.log(`clearing tags`);
            let curr = {};
            Object.keys(prev).forEach(tagName => {
                curr[tagName] = false;
            });
            return curr;
        });
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

  const setFavourite = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/add-favourite', { userId: props.userId, remarkId: id })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className={`remark-sides`}>
    {isError && <ErrorMessage error={error} editable={props.editable} setEmpty={removeError}/>}
      <div className={`remark-${getEditable()}-item`}>
        <div className={`remark-wrapper remark-wrapper-${getCurrentColor()} shadow-${getCurrentColor()}`}>
          {(error.empty !== null) && error.empty && !props.editable ? <h5>{error.message}</h5> : null}
          <div className={`remark-text`}>
            <textarea
              className='remark-input'
              readOnly={!props.editable}
              placeholder={`${getPlaceholder()}`}
              value={message}
              onChange={(e) => onTextChange(e.target.value)}
            />
          </div>
          {
            !props.editable && props.userId ?
              <div className="manipulate-wrapper">
                <div className="manipulate-buttons">
                  <button className="btn-manipulate" onClick={setFavourite}>
                    <FontAwesomeIcon className={`btn-icon`} icon={faStar} />
                  </button>
                  <button className="btn-manipulate" onClick={null}>
                    <FontAwesomeIcon className={`btn-icon`} icon={faArrowUp} />
                  </button>
                  <button className="btn-manipulate" onClick={null}>
                    <FontAwesomeIcon className={`btn-icon`} icon={faArrowDown} />
                  </button>
                </div>
              </div>
              :
              null
          }
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
