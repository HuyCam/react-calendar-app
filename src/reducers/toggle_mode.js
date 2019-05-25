import { TOGGLE_MODE } from '../actions/index';


// there should be two mode 'MONTHS' and 'DAYS'
export default function(state = null, action) {
    switch (action.type) {
        case TOGGLE_MODE:
          return action.payload;
        default:
          return state;
    }
}