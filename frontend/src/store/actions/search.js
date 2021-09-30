import { SEARCH } from './actionTypes';

export const search = (name) => ({ type: SEARCH, name});

export const searchLocal = (country) =>{
    let todayInfo;
    console.log(country);
    fetch(`http://localhost:4000/api/todayTest/${country}`)
    .then(res=> res.json())
    .then(data=>{
         todayInfo= data[0];
    })
   
    return dispatch=>({
        type: 'DAILY',
        todayInfo
        
        
    })
}
    