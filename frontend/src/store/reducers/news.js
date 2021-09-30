import { FETCH_NEWS_FAIL, FETCH_NEWS_START, FETCH_NEWS_SUCCESS } from '../actions/actionTypes';

import { updateObject } from '../utility.js';

const initialState = {
    loading: false,
    error: null,
    news: null,
};

const fetchNewsStart = ( state, action ) => updateObject(state, { error: null, loading: true });
const fetchNewsFail = ( state, action ) => updateObject(state, {
    error: action.error,
    loading: false 
});
const fetchNewsSuccess = ( state, action ) => updateObject(state, { 
    error: null,
    news: action.news,
    loading: false 
});

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case FETCH_NEWS_START : return fetchNewsStart(state, action);
        case FETCH_NEWS_FAIL: return fetchNewsFail(state, action);
        case FETCH_NEWS_SUCCESS: return fetchNewsSuccess(state, action);
        default: return state;
    }
};

export default reducer;
