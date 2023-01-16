const initialState = {
    menItems: null,
    womenItems: null
}

export const featuredReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TOP4_DATA':
            switch (action.payload.gender) {
                case 'men':
                    return {
                        ...state,
                        menItems: action.payload.items
                    }
                case 'women':
                    return {
                        ...state,
                        womenItems: action.payload.items
                    }
                default:
                    return state;
            }
        default:
            return state;
    }
};

export default featuredReducer;