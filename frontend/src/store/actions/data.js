import axios from 'axios';

import { FETCH_DATA_FAIL, FETCH_DATA_START, FETCH_DATA_SUCCESS, FILTER } from './actionTypes';

export const fetchDataStart = () => ({ type: FETCH_DATA_START});
export const fetchDataSucces = ( data ) => ({
    type: FETCH_DATA_SUCCESS,
    data
});
export const fetchDataFail = (error) => ({
    type: FETCH_DATA_FAIL,
    error,
});

export const sort = (key) => ({
    type: FILTER,
    key,
});

export const fetchData = () => (dispatch) => {
    dispatch(fetchDataStart());

    axios.get('https://corona.lmao.ninja/v2/countries')
        .then((response) => {
            const res = [];
            response.data.forEach((element, index) => {
                res.push({
                    ...element,
                    id: index,
                });
            });
            dispatch(fetchDataSucces(res));
            return res;
        }).catch((error) => {
            dispatch(fetchDataFail(error));
        });
}

export const filter = (key) => (dispatch) => {
    dispatch(fetchDataStart());
    dispatch(sort(key));
    axios.get('https://corona.lmao.ninja/v2/countries', {
        params: {sort: key}
    })
        .then((response) => {
            const res = [];
            response.data.forEach((element, index) => {
                res.push({
                    ...element,
                    id: index,
                });
            });
            dispatch(fetchDataSucces(res));
        }).catch((error) => {
            dispatch(fetchDataFail(error));
        });
}