import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import dataReducer from './reducers/data';
import searchReducer from './reducers/search';
import countryReducer from './reducers/country';
import authReducer from './reducers/auth';
import newsReducer from './reducers/news';
import todayInfoReducer from './reducers/todayInfo';

const rootReducer = combineReducers({
    news: newsReducer,
    covidData: dataReducer,
    search: searchReducer,
    country: countryReducer,
    auth: authReducer,
    todayInfo: todayInfoReducer
});

const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

export default store;
