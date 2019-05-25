import { UPDATE_MONTH_YEAR, TODAY, SELECTED_DATE } from '../actions/index.js';

export function updateNavigation(state = {}, action) {
    switch(action.type) {
        case UPDATE_MONTH_YEAR:
          return action.payload;
        default:
          return state;
    }
}

export function getToday(state = {}, action) {
  switch(action.type) {
    case TODAY:
      return action.payload;
    default: 
      return state;
  }
}

export function selectDate(state = {}, action) {
  switch(action.type) {
    case SELECTED_DATE:
      return action.payload;
    default:
      return state;
  }
}