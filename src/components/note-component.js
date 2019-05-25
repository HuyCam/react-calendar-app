import React from 'react';

const NoteComponent = ({note: { title, date, body}}) => {
    return ( 
        <div className="note-container">
          <h4 className="note-title">
            {title}
          </h4>
          <small className="note-body">{date}</small>
          <p className="note-body">{body}</p>
        </div>
    );
};

export default NoteComponent;