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
            return 'No thing to show yet'
        }
        
        
    }

    render() {
        return(
            <div>
                {this.renderNotes()}
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