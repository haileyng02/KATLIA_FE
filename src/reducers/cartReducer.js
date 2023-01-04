const initialState = {
    quantity: 0
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_CART':
            const qty = action.payload.reduce((a, b) => a + b.quantity, 0)
            return {
                quantity: qty
            }
        case "ADD_TO_CART":
            return {
                quantity: state.quantity + action.payload.quantity
            };
        case 'DELETE_CART_ITEM':
            return {
                quantity: state.quantity - action.payload.quantity
            };
        case 'UPDATE_CART_ITEM':
            return {
                quantity: state.quantity - action.payload.oldVal + action.payload.newVal
            };
        case 'PLUS_CART': {
            return {
                quantity: state.quantity + 1
            }
        }
        case 'MINUS_CART': {
            return {
                quantity: state.quantity - 1
            }
        }
        case 'CLEAR_CART':
            return {
                quantity: 0
            }
        default:
            return state;
    }
};

export default cartReducer;