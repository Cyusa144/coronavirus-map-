import { FETCH_DATA_START, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL, FILTER } from '../actions/actionTypes';
import { updateObject } from '../utility.js';

const initialState = {
    loading: false,
    error: null,
    data: null,
    sort: '',
};

const fetchDataStart = ( state, action ) => updateObject(state, { error: null, loading: true });
const fetchDataFail = ( state, action ) => updateObject(state, {
    error: action.error,
    loading: false 
});
const fetchDataSuccess = ( state, action ) => updateObject(state, { 
    error: null,
    data: action.data,
    loading: false 
});

const sort = ( state, action ) => updateObject(state, { sort: action.key });

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case FETCH_DATA_START : return fetchDataStart(state, action);
        case FETCH_DATA_FAIL: return fetchDataFail(state, action);
        case FETCH_DATA_SUCCESS: return fetchDataSuccess(state, action);
        case FILTER: return sort(state, action);
        default: return state;
    }
};

export default reducer;
