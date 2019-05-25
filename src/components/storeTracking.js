import React, { Component } from 'react';
import { connect } from 'react-redux';

class StoreChecking extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {

        return (
            <div></div>
        )
    }
}

function mapStateToProps(state) {
    return {
        info: state
    }
}

export default connect(mapStateToProps)(StoreChecking);