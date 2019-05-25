import React, { Component } from 'react';
import Calendar from './calendar';
import Notes from './notes-reminder';
import { updateMonthYear, updateToday, toggleMode, fetchNotes, selectedDate } from '../actions/index';
import { MONTHS_MODE, DAYS_MODE} from '../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// testing purpose
import StoreChecking from './storeTracking';
//end testing
class App extends Component {
  componentDidMount() {
    const today = new Date();
    this.props.updateMonthYear(today.getFullYear(), today.getMonth());
    this.props.updateToday(today.toDateString());

    // first of when start the app, toggle day mode to view days instead of months
    this.props.toggleMode(DAYS_MODE);

    // fetch all notes reminder
    this.props.fetchNotes();

    // automatic selected date is today
    this.props.selectedDate(today.toDateString());
  }

  render() {
    return (
      <div className="container">
          <div >
            <Calendar />
            <Link className="btn btn-primary" to="/reminder/add">
              Add Reminder
            </Link>
          </div>
          <div>
            <Notes />
            <StoreChecking />
          </div>
        </div>
    );
  }
}

export default connect(null, { updateMonthYear, updateToday, toggleMode, fetchNotes, selectedDate })(App);
