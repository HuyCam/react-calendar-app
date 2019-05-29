import { combineReducers } from 'redux';
import { updateNavigation, getToday, selectDate }from './update_date';
import toggleMode from './toggle_mode';
import { reducer as formReducer } from 'redux-form';
import { getNotes } from './notes';
import { editingNote } from './editing_note';
const rootReducer = combineReducers({
  time: updateNavigation,
  today: getToday,          // this is now a date in string
  mode: toggleMode,
  form: formReducer,
  notes: getNotes,
  selectedDate: selectDate,
  editingNote: editingNote
});

export default rootReducer;
