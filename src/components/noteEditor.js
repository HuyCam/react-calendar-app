import React from 'react';

import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchNotes } from '../actions';
class NoteEditor extends React.Component {
    constructor(props) {
        super(props);

        this.renderNote = this.renderNote.bind(this);
    }
    renderField(field) {
        const {meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <p className="input"><input type={field.input.name} className="form-control" {...field.input} /></p>
                <p className="help-text text-danger">{touched ? error : ''}</p>
            </div>
        )
    }

    onSubmit(val) {
        const id = this.props.note._id.toString();
        console.log(val);
        axios.patch(`https://mighty-wave-94852.herokuapp.com/notes/${id}`, val).then(note => {
            this.props.history.push('/');
        }).catch(e => {
            console.log(e);
        });  
    }

    renderNote() {
        if (this.props.note.date) {
            return (
               <div>
                <h3>{this.props.note.date}</h3>
                <Field
                    label="title"
                    name="title"
                    isDate={true}
                    component={this.renderField}
                />
                <Field
                    label="Note"
                    name="body"
                    component={this.renderField}
                />

                <button type="submit" className="btn-primary">Submit</button>
                <Link className="btn-warning" to="/">Cancel</Link>
                </div>
            )
        } else {
            return (
                <div>
                    <p>Error: no note to edit</p>
                    <Link className="btn-warning" to="/">Go Back</Link>
                </div>
            )
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="add-note">
            {this.renderNote()}
            </form>
        )
    }
}

const validate = (values) => {
    const errors = {};

    if (!values.date) {
        errors.date = 'Please select a date';
    }

    return errors;
}

const mapStateToProps = (state) => {
    return {
        note: state.editingNote
    }
}

export default reduxForm({
    validate,
    form: 'NoteEditor'
})(
    connect(mapStateToProps)(NoteEditor)
)