import { SEARCH } from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    name: ''
};

const search = (state, action) => updateObject(state, { name: action.name });

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SEARCH: return search(state, action);
        default: return state;
    }

}

export default reducer;