import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TagList from './TagList';
import '../styles/remark.scss';

function Remark(props) {
  const [message, setMessage] = useState('');
  const [tags, setTags] = useState({});
  // const [empty, setEmpty] = useState(true)
  // const [latest, setLatest] = useState({lat_message: " ", lat_status: false })
  const [error, setError] = useState({empty: null, lat_message:"", lat_status: false, message:""});
  let btnref_send = useRef();
  let btnref_get = useRef()

  const onTextChange = (message) => {
    if (error.empty !== null)  {
      setError(prev=> ({...prev, empty:null, message :""}))
    }
    setMessage(message)
  } 
  const getTags = () => {
    if (!props.editable) return;
    axios.get('http://localhost:3001/get-tags').then((res) => {
      setTags(res.data);
    });
  };

  const getRandomRemark = () => {
    btnref_get.current.setAttribute("disabled", "disabled")
    axios.get('http://localhost:3001/get-random-remark').then((res) => {
      // console.log(res.status)
      let remark = res.data;
      setMessage(remark.message);
      let newTags = {};
      remark.tags.forEach((tag) => newTags[tag] = false);
      setTags(newTags);
      if (res.status === 200) { 
        btnref_get.current.removeAttribute("disabled");
      }

    });
  };

  const sendRemark = () => {
    if (error.lat_message === message) {
      console.log(error.lat_message, "same message added")
      setError({...error, lat_status: true })
    } 
    else { 
      
      btnref_send.current.setAttribute("disabled", "disabled")
      let selectedTags = Object.keys(tags).filter(tagName => tags[tagName]);
      axios.post('http://localhost:3001/add-remark', { message: message, tags: selectedTags }).then((res) => {
        console.log("Remark added. This is where we'd clear those fields and give user feedback.");
        // console.log(res.status)
        // console.log(res.status)
        if (res.status === 200) { 
          btnref_send.current.removeAttribute("disabled");
          setError({...error, lat_message: message, lat_status: true})
          setMessage("")
          // console.log(latest)
        }
      });
    // }
  }; }

  const handleClick = e => {
    if (message.trim() === "") { 
      // setEmpty(true)
      setError( prev => ({...prev, empty:true,message:"Empty text box"}))
      return
    }
    
    // console.log(btnref_send.current || btnref_get.current)
    if (btnref_send.current || btnref_get.current) {
      // console.log(!empty)
      console.log(error.empty)
      if (props.editable & !error.empty) {
        sendRemark();
      } else if (!props.editable) {
        getRandomRemark();

      }
    }
  };
  // const setempty = useEffect(() => {
  //   console.log(message.trim() === "")
  //   // console.log(message)
  //   if (message.trim() === "") { 
  //     // setEmpty(true)
  //     setError( prev => ({...prev, empty:true}))
  //   }
  //   else { 
  //     // setEmpty(false)
  //     setError({...error, empty:false})
  //     // setError({empty:false,...error})
  //   }
  //   }
  // , [message])

  // useEffect(()=> { 
  //   // console.log(error)
  //   if (error.empty){ 
  //       setError( prev => ({...prev, message:"Empty text box"}))
  //   }
  //   else if(error.lat_status) { 
  //     setError( prev => ({...prev, message:"same text twice"}))
      

  // }}, [error.empty, error.lat_status])

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
              <div>{error.empty !== null & error.empty ? <h5>{error.message}</h5> : null}</div>
                <div className={`remark-text`}>
                    <textarea
                    className="remark-input"
                    readOnly={!props.editable}
                    placeholder={`${getPlaceholder()}`}
                    value={message}
                    onChange={(e) => onTextChange(e.target.value)}
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
        <button ref = {btnref_send} className={`btn-circle btn-blue shadow-blue`} onClick={handleClick}>{`Send`}</button>
        : <button ref = {btnref_get} className={`btn-rect btn-peach shadow-peach`} onClick={handleClick}>{`See another`}</button>}
        </div>
    </div>
  );
}

export default Remark;
