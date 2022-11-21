const initialState = {
    currentUser: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIGN_IN":
            return {
                currentUser: { token: action.payload }
            };
        default:
            return state;
    }
};

export default authReducer;