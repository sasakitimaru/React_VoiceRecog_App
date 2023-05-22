import * as planaction from './planactions';
import initialState from '../store/initialState';

const planReducer = (state = initialState.planContent, action) => {
    switch (action.type) {
        case planaction.INITIALIZE_PLAN_STATE:
            return [
                ...state,
                action.payload
           ]
        default:
            return state;
    }
}
export default planReducer;