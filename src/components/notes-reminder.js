import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import NoteComponent from './note-component';

class Notes extends Component {
    renderNotes() {
        const reminders = this.props.reminders;
        if (!reminders || _.isEmpty(reminders)) {
            return <div className="note-container">
            <div className="note-notification">
                <h4>
                Data is loading
                </h4>
            </div>
            </div>;
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
            <div className="note-notification">
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
                <div class="warning">The user can now add, edit and delete note</div>
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