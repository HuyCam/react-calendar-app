import React, { Component } from 'react';
import Days from './days';
import Months from './months';
import Navigation from './navigation';
import { connect } from 'react-redux';

// import modes
import { MONTHS_MODE, DAYS_MODE} from '../actions/index';

class Calendar extends Component {
    render() {
      const mode = this.props.mode;
      let display;

      // if display mode true, then day is displayed, months is off.
      // if display mode false, then months is displayed, days is off.
      if (mode === DAYS_MODE) {
          display = true;
      } else {
          display = false;
      }
      return (
        <div id="calendar">
            <Navigation />
            <Days displayOption={display} />
            <Months displayOption={display} />
        </div>
      );
    }
}

function mapStateToProps(state) {
  return {
      mode: state.mode
  }
}

export default connect(mapStateToProps)(Calendar);