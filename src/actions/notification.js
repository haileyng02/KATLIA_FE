export const openNotification = (notification) => {
    return {
        type: "OPEN_NOTIFICATION",
        payload: notification,
    };
};

export const resetNotification = (notification) => {
    return {
        type: "RESET_NOTIFICATION",
        payload: notification,
    };
};