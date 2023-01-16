export const getTop4Data = (items, gender) => {
    return {
        type: "GET_TOP4_DATA",
        payload: { items, gender },
    };
};