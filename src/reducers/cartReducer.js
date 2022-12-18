const initialState = {
    cartItems: []
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const i = state.cartItems.find.findIndex(e => e.productId === action.payload.productId);
            if (i > -1) {
                const temp = [...state.cartItems];
                temp[i] = {...temp[i],quantity: temp[i].quantity + action.payload.quantity};
                return { 
                    cartItems: [...temp] 
                };
            }
            return {
                cartItems: [...state.cartItems, action.payload]
            };
        case 'DELETE_CART_ITEM':
            return {
                cartItems: state.cartItems.splice(state.cartItems.findIndex(item => item.productId === action.payload))
            };
        default:
            return state;
    }
};

export default cartReducer;