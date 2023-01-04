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

export const updateCartItem = (oldVal,newVal) => {
    return {
        type: "UPDATE_CART_ITEM",
        payload: {oldVal,newVal},
    };
};

export const plusCart = () => {
    return {
        type: "PLUS_CART"
    }
}

export const minusCart = () => {
    return {
        type: "MINUS_CART"
    }
}

export const clearCart = () => {
    return {
        type: "CLEAR_CART",
    };
};

