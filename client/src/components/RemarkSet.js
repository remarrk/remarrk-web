import { useState } from 'react';
import Remark from './Remark';
import LongButton from './LongButton';
import '../styles/remarkSet.scss';

function RemarkSet() {
    let [editable, setEditable] = useState(false);

    const toggleEditable = () => {
        console.log(`toggled editable ${editable}`);
        setEditable(!editable);
    };

  return (
    <div className={`remark-flex-side`}>
      <Remark className={`remark-flex-item`} editable={editable} />
      <LongButton buttonText={`+ New`} editable={editable} onModeChange={toggleEditable} />
    </div>
  );
}

export default RemarkSet;
