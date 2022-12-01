const initialState = {
    notificationContent: null,
}

export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "OPEN_NOTIFICATION":
            return {
                notificationContent: action.payload
            };
        case "RESET_NOTIFICATION":
            return {
                notificationContent: null
            };
        default:
            return state;
    }
};

export default notificationReducer;