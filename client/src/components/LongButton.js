import React from 'react';
import '../styles/longButton.scss';

function LongButton({ buttonText, editable, onModeChange }) {
    const getCurrentColor = () => {
        return editable ? `blue` : `peach`;
    };

    return (
        <div className={`long-button long-button-${getCurrentColor()}`} onClick={onModeChange}>
            <h2>{buttonText}</h2>
        </div>
    )
}

export default LongButton
