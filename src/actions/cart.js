export const addToCart = (item) => {
    return {
        type: "ADD_TO_CART",
        payload: item,
    };
};

export const deleteCartItem = (productId) => {
    return {
        type: "DELETE_CART_ITEM",
        payload: productId,
    };
};

export const updateCartItem = ({productId,quantity}) => {
    return {
        type: "UPDATE_CART_ITEM",
        payload: {productId,quantity},
    };
};

