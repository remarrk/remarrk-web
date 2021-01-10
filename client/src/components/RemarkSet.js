import { useState } from "react";
import Remark from "./Remark";
import LongButton from "./LongButton";
import "../styles/remarkSet.scss";

function RemarkSet(props) {
    let [editable, setEditable] = useState(false);
    let [buttonText, setButtonText] = useState('+ New');

  const toggleEditable = () => {
    console.log(`toggled editable ${editable}`);
    setEditable(!editable);
    setButtonText(editable ? `+ New` : `Browse`);
  };

  return (
    <div className={`remark-flex-wrap`}>
      <div className={`remark-flex-side`}>
        <Remark className={`remark-flex-item`} editable={editable} userId={props.userId}/>
        <LongButton buttonText={buttonText} editable={editable} onModeChange={toggleEditable} />
      </div>
      <div className={`remark-flex-side`}>
        <Remark className={`remark-flex-item`} editable={editable} />
        <LongButton
          buttonText={buttonText}
          editable={editable}
          onModeChange={toggleEditable}
        />
      </div>
    </div>
  );
}

export default RemarkSet;
