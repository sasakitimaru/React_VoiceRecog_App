import * as useractions from './useractions';
import initialState from '../store/initialState';

const userReducer = (state = initialState.user, action) => {
    switch (action.type) {
        case useractions.PLUS_TOKEN:
            return {
                ...state,
                ...action.payload
            }
        case useractions.CHANGE_PLAN:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}
export default userReducer;