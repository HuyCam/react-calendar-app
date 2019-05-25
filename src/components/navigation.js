import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMonthYear, toggleMode } from '../actions/index';
import { MONTHS_MODE, DAYS_MODE} from '../actions/index';

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.handleIncrement = this.handleIncrement.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
        this.handleChangeMode = this.handleChangeMode.bind(this);
    }

    handleIncrement() {
        
        let { month, year } = this.props;
        switch(this.props.mode) {
            case DAYS_MODE:
            // increase month by one
                if (month === 11) {
                    year++;
                    month = 0;
                    this.props.updateMonthYear(year, month);
                } else {
                    month++;
                    this.props.updateMonthYear(year, month);
                }
                break;
            case MONTHS_MODE:
            // increase year by one
                year++;
                this.props.updateMonthYear(year, undefined);
                break;
        }
        
    }

    handleDecrement() {
        let { month, year } = this.props;
        switch(this.props.mode) {
            case DAYS_MODE:
                // decrease month by one
                if (month === 0) {
                    year--;
                    month = 11;
                    this.props.updateMonthYear(year, month);
                } else {
                // decrease year by one;
                    month--;
                    this.props.updateMonthYear(year, month);
                }
                break;
            case MONTHS_MODE:
                year--;
                this.props.updateMonthYear(year, undefined);
                break;
        }
    }

    handleChangeMode() {
        const mode = this.props.mode;
        switch (mode) {
            // case MONTHS_MODE:
            //   this.props.toggleMode(DAYS_MODE);
            //   break;
            case DAYS_MODE:
              this.props.toggleMode(MONTHS_MODE);
              break;
        }
    }

    render() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const { month, year } = this.props;
        return(
          <div className="navigation">
            <div>
            <button className="" onClick={this.handleDecrement}> {"<"} </button>
            <button className="navigation-info" onClick={this.handleChangeMode}>{this.props.mode === 'DAYS' ? months[month] : null} {year}</button>
            <button className="" onClick={this.handleIncrement}> {">"} </button>
            </div>
          </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        month: state.time.month,
        year: state.time.year,
        mode: state.mode
    }
}
export default connect(mapStateToProps, { updateMonthYear, toggleMode  })(Navigation);