const initialState = {
    mixItems: [{}, {}, {}, {}],
    mixGender: 'men',
    mixColor: 0
}

export const mixmatchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MIX_ITEMS':
            return {
                ...state,
                mixItems: action.payload,
            }
        case 'SET_MIX_GENDER':
            return {
                ...state,
                mixGender: action.payload,
            }
        case 'SET_MIX_COLOR':
            return {
                ...state,
                mixColor: action.payload,
            }
        case 'MIX_RESET':
            return {
                mixItems: [{}, {}, {}, {}],
                mixGender: 'men',
                mixColor: 0
            }
        default:
            return state;
    }
};

export default mixmatchReducer;