import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import NoteComponent from './note-component';

class Notes extends Component {
    renderNotes() {
        const reminders = this.props.reminders;
        if (!reminders || _.isEmpty(reminders)) {
            return 'Data is loading...';
        }

        const notesCollection = _.find(reminders, (notes) => {
            if (notes[0].date === this.props.selectedDate) {
                return notes;
            }
        })
        
        if (notesCollection) {
            const JSXnotes = notesCollection.map(note => {
                return <NoteComponent key={note.title} note={note} />;
            });
            return JSXnotes;
        } else {
            return <div className="note-container">
            <div className="note-title">
                <h4>
                No thing to show yet
                </h4>
            </div>
            </div>
        }
    }

    render() {
        return(
            <div id="note">
                {this.renderNotes()}
                <div class="warning">This is on development process. In the future user can edit task, delete task and login</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        reminders: state.notes,
        selectedDate: state.selectedDate
    }
}
export default connect(mapStateToProps)(Notes);