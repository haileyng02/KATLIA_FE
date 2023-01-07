export const setMixItems = (items) => {
    return {
        type: "SET_MIX_ITEMS",
        payload: items,
    };
};

export const setMixGender = (gender) => {
    return {
        type: "SET_MIX_GENDER",
        payload: gender,
    };
};

export const setMixColor = (colorId) => {
    return {
        type: "SET_MIX_COLOR",
        payload: colorId,
    };
};

export const mixReset = () => {
    return {
        type: "MIX_RESET"
    };
}