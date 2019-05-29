import React from 'react';
import axios from 'axios';
import { fetchNotes, editNote } from '../actions/index';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class NoteComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    this.props.editNote(this.props.note);
  }

  handleDelete() {
    const {note: { _id} } = this.props;
    axios.delete(`https://mighty-wave-94852.herokuapp.com/notes/${_id}`).then(_ => this.props.fetchNotes());
  }
  render() {
    const {note: { title, date, body}} = this.props;
    return ( 
      <div className="note-container">
        <div className="note-title">
        <h4>
          {title}
        </h4>
        </div>
        
        <div className="note-body"> 
          <p>{date}</p>
          <p>{body}</p>
        </div>
        
        <div className="note-options">
        <div className="left">
          <Link to="/edit">
          <button className="btn-primary" onClick={this.handleEdit}>Edit</button>
          </Link>
        </div>
        <div className="right">
         <button className="btn-warning" onClick={this.handleDelete}>Delete</button>
        </div>
        </div>
        
      </div>
  );
  }
};

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchNotes: bindActionCreators(fetchNotes, dispatch),
    editNote: bindActionCreators(editNote, dispatch)
  })
}

export default connect(null, mapDispatchToProps)(NoteComponent);