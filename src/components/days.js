import React, { Component } from 'react';
import _ from 'lodash';
import Day from './day';
import { connect } from 'react-redux';
import { updateMonthYear, selectedDate } from '../actions/index';

class Days extends Component {
    constructor(props) {
        super(props);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleSelectedDate = this.handleSelectedDate.bind(this);
    }

    renderDay(year, month) {
        /* firstDate is the first day of the month
        ** firstCalendarDate is the first day of the calendar need to display
        ** firstCalendarDate is always the sunday
        ** lastCalendarDate is always the saturday
        */
        const firstDate = new Date(year, month, 1);
        const lastDate = new Date(year, month + 1, 0);
        const firstCalendarDate = this.getFirstDayOfWeek(firstDate);
        const lastCalendarDate = this.getLastDayOfWeek(lastDate);
        const dates = this.calendarDate(firstCalendarDate, lastCalendarDate);
        return dates;
    }

    // get the start date of the calendar and the end date of the calendar to iterate through and render all
    // start and end are date objects
    calendarDate(start, end) {
        // id format will be MMDD
        let id;
        let dates = [];
        const currentMonth = this.props.month;
        const currentDate = this.props.currentDate;
        const today = new Date(currentDate);

        
        while (start <= end) {
            id = start.getMonth()+ '' + start.getDate();
            const type = this.dateType(start.getMonth(), currentMonth, start.getDay());
            // const haveNote = this.doHaveNote(start.toDateString);
            // console.log('havenote: ',this.doHaveNote);
            const haveNote = this.doHaveNote(start.toDateString());

            let cornerType = 'none';
                // cornerType is for designing purpose.
                // In the last row of days, two dates at the far end opposite side have a redius corner
                if (start.getTime() === end.getTime()) {
                    cornerType = 'end-corner';
                } // check if this is the first day of the week in the last week on calendar
                // 518400000 is the difference of 7 days
                else if (start.getTime() === end.getTime() - 518400000) {
                    cornerType = 'start-corner';
                }
            // if this calendar date is today
            if (today.getTime() === start.getTime()) {
                const today = 'today';
                const autofocus = true;

                dates.push(
                  <Day 
                    key={id} 
                    date={_.clone(start)} 
                    type={{type, today}} 
                    autofocus={autofocus} 
                    onDateChange={this.onDateChange} 
                    handleSelectedDate={this.handleSelectedDate}
                    doesHaveNote={haveNote}
                    cornerType={cornerType}
                    >
                  </Day>);
            } else {
                dates.push(
                  <Day 
                  key={id} 
                  date={_.clone(start)} 
                  type={{type}} 
                  onDateChange={this.onDateChange} 
                  handleSelectedDate={this.handleSelectedDate}
                  doesHaveNote={haveNote}
                  cornerType={cornerType}
                  >
                  </Day>);
            }

            // in crease start one day
            start.setDate(start.getDate() + 1);
        }
        return dates;
    }

    doHaveNote(dateString) {
        if (this.props.notes && this.props.notes[dateString]) {
            return  true;
        }   
        return false;
    }
    // determine if this is the date belong to this month or weekend or regular day
    dateType(month, currentMonth, day) {
        if (month !== currentMonth) {
            return 'not-belong';
        } if (day === 0 || day === 6) {
            return 'weekend';
        } else {
            return 'regular';
        }
    }

    // return the first date object of the week
    getFirstDayOfWeek(dateObj) {
        const firstDate = _.clone(dateObj);
        const difference = dateObj.getDay() - 0;
        firstDate.setDate(firstDate.getDate() - difference);
        return firstDate;
    }

    getLastDayOfWeek(dateObj) {
       const lastDate = _.clone(dateObj);
       const difference = 6 - dateObj.getDay();
       lastDate.setDate(lastDate.getDate() + difference);
       return lastDate;
    }

    // this event receive the date of the component and dispatch
    // update date
    onDateChange(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        this.props.updateMonthYear(year, month);
    }

    // date should be an object
    handleSelectedDate(dateString) {
        console.log('handle selected date fire');     
        this.props.selectedDate(dateString);
    }

    // rendering names of the days in a week
    renderDayName() {
        const days = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days.map((day) => <div className="day-render day-name" key={day}>{day}</div>);
    }

    render() {
      // if display mode is false then don't display days
      if (!this.props.displayOption) {
          return null;
      }
      const { year, month } = this.props;
      return(
          <div className="calendar" >
            {this.renderDayName()}
            {this.renderDay(year, month)}
          </div>
      );
    }
}

   

// Days keeps the current month, year, and date
function mapStateToProps(state){
    return {
        month: state.time.month,
        year: state.time.year,
        currentDate: state.today,
        notes: state.notes
    }
}
export default connect(mapStateToProps, { updateMonthYear, selectedDate })(Days);