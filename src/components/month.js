import React, { Component } from 'react';

const Month = (props) => {
    const monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const time = props.time;

    return (
        <button className="month-render month" onClick={() => props.accessMonth(time)}>
            {monthNames[props.time.month]}
        </button>
    );
};

export default Month;