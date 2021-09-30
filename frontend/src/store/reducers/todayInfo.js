const initialState = {
    todayInfo:null
};



const todayInfoReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'DAILY':
            return {
                ...state,
                todayInfo: action.todayInfo
            }
        default: return state;
    }
}

export default todayInfoReducer;