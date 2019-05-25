import React from 'react';

const NoteComponent = ({note: { title, date, body}}) => {
    return ( 
        <div className="note-container">
          <div className="note-title">
          <h4>
            {title}
          </h4>
          </div>
          
          <div className="note-body"> 
            <p>{date}</p>
            <p>{body}</p>
          </div>
          
        </div>
    );
};

export default NoteComponent;