import { COUNTRY } from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    data: null
};

const setCountry = (state, action) => updateObject(state, { data: action.data });

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case COUNTRY: return setCountry(state, action);
        default: return state;
    }
}

export default reducer;