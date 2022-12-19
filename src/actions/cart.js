export const initCart = (cartItems) => {
    return {
        type: "INIT_CART",
        payload: cartItems,
    };
};

export const addToCart = (item,quantity) => {
    return {
        type: "ADD_TO_CART",
        payload: {item,quantity},
    };
};

export const deleteCartItem = (productId,quantity) => {
    return {
        type: "DELETE_CART_ITEM",
        payload: {productId,quantity},
    };
};

export const updateCartItem = (productId,quantity) => {
    return {
        type: "UPDATE_CART_ITEM",
        payload: {productId,quantity},
    };
};

