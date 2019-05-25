import axios from 'axios';

export const UPDATE_MONTH_YEAR = 'UPDATE_MONTH_YEAR';
export const TODAY = 'TODAY';
export const TOGGLE_MODE = 'TOGGLE_MODE';
export const GET_NOTES = 'GET_NOTES';
export const SELECTED_DATE = 'SELECTED_DATE';
export const POST_NOTE = 'POST_NOTE';

// display mode
export const MONTHS_MODE = 'MONTHS';
export const DAYS_MODE = 'DAYS';

export function updateMonthYear(year, month) {
    return {
        type: UPDATE_MONTH_YEAR,
        payload: { year, month }
    }
}

export function updateToday(dateString) {
    return {
        type: TODAY,
        payload: dateString
    }
}

export function toggleMode(mode) {
  return {
      type: TOGGLE_MODE,
      payload: mode
  }
}

export function fetchNotes() {
    const request = axios.get('https://mighty-wave-94852.herokuapp.com/notes');

    return {
        type: GET_NOTES,
        payload: request
    }
}

export function postNote(value, navigateBack) {
    const request = axios.post('https://mighty-wave-94852.herokuapp.com/notes', value).then(() => navigateBack());
    return {
        type: POST_NOTE,
        payload: request
    }
}

export function selectedDate(dateString) {
    // date should be just a object like today { year, month , date}
    return {
        type: SELECTED_DATE,
        payload: dateString
    };
}