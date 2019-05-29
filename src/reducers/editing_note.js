import { EDIT_NOTE, DONE_EDIT } from '../actions/index';
export const editingNote = (state = {} , action) => {
    switch(action.type) {
        case EDIT_NOTE:
            return action.payload;
        case DONE_EDIT:
            return {};
        default:
            return state;
    }
}