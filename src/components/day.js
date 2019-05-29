import React from 'react';


const Day = (props) => {
  const today = props.type.today ? props.type.today : '';
  const type = props.type.type;

  const onDateChange = () => {
    if (type === 'not-belong') {
      props.onDateChange(props.date);
    }
  };
  
  const handleClick = () => {
    props.handleSelectedDate(props.date.toDateString());
    onDateChange();
  };
  const haveNote = (props.doesHaveNote && props.type.type !== 'not-belong') ? 'have-note' : '';
  return(
    <button 
      className={`day-render ${props.type.type} ${today} ${haveNote} ${props.cornerType}`} 
      onClick={handleClick} 
      autoFocus={props.autofocus} 
      >
      <time>
      {props.date.getDate()}
      </time>
    </button>
  );
}

export default Day;