import React, { Component } from 'react';
import Navigation from './navigation';
import Month from './month';
import { updateMonthYear, toggleMode } from '../actions/index';
import { DAYS_MODE } from '../actions/index';
import { connect } from 'react-redux';

class Months extends Component {
    constructor(props) {
        super(props);

        this.handleAccessMonth = this.handleAccessMonth.bind(this);
    }
    renderMonths() {
        const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        const year = this.props.time.year;
        return months.map(month => <Month  key={month} time={{year, month}} accessMonth={this.handleAccessMonth} />);
    }
  
    handleAccessMonth({ year, month }) {
        console.log('Handle acess month');
        this.props.updateMonthYear(year, month);
        this.props.toggleMode(DAYS_MODE);
    }
  render() {
      // if display option is true, then don't display months
      if (this.props.displayOption) {
        return null;
      }

      return(
          <div className="calendar">
              {this.renderMonths()}
          </div>
      );
  }
}

function mapStateToProps(state) {
    return {
        time: state.time
    }
}
export default connect(mapStateToProps, { updateMonthYear, toggleMode })(Months);