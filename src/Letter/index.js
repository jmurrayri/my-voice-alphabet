import React from 'react';

export default ({letter, handleClick}) => {
    return (
        <div className="letter-container" onClick={()=>handleClick(letter)}>
            {letter}
        </div>
    );
};
