import axios from 'axios';

import { FETCH_NEWS_FAIL, FETCH_NEWS_START, FETCH_NEWS_SUCCESS } from './actionTypes';

export const fetchNewsStart = () => ({ type: FETCH_NEWS_START});
export const fetchNewsSucces = ( news ) => ({
    type: FETCH_NEWS_SUCCESS,
    news
});
export const fetchNewsFail = (error) => ({
    type: FETCH_NEWS_FAIL,
    error,
});

export const fetchNews = () => (dispatch) => {
    dispatch(fetchNewsStart());

    axios.get('http://localhost:4000/api/news')
        .then((response) => {
            const { data } = response.data;
            dispatch(fetchNewsSucces(data));
            return data;
        }).catch((error) => {
            dispatch(fetchNewsFail(error));
        });
}