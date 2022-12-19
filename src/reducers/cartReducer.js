const initialState = {
    cartItems: [],
    quantity: 0
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_CART':
            const qty = action.payload.reduce((a, b) => a + b.quantity, 0)
            return {
                cartItems: action.payload,
                quantity : qty
            }
        case "ADD_TO_CART":
            const formattedItem = {...action.payload.item,productId:action.payload.item.id}
            const i = state.cartItems.findIndex(e => e.productId === formattedItem.productId);
            if (i > -1) {
                const temp = [...state.cartItems];
                console.log(temp)
                console.log({ ...temp[i], quantity: temp[i].quantity + action.payload.quantity })
                temp[i] = { ...temp[i], quantity: temp[i].quantity + action.payload.quantity };
                console.log([...temp])
                return {
                    cartItems: [...temp],
                    quantity: state.quantity + action.payload.quantity
                };
            }
            return {
                cartItems: [...state.cartItems, {...formattedItem,quantity: action.payload.quantity}],
                quantity: state.quantity + action.payload.quantity
            };
        case 'DELETE_CART_ITEM':
            console.log(state.cartItems.filter(function( obj ) {
                return obj.productId !== action.payload.productId;
            }))
            return {
                cartItems:  state.cartItems.filter(function( obj ) {
                    return obj.productId !== action.payload.productId;
                }),
                quantity: state.quantity - action.payload.quantity
            };
        case 'UPDATE_CART_ITEM':
            return {
                cartItems: state.cartItems.map((item) => {
                    if (item.productId === action.payload.productId) return { ...item, quantity: action.payload.quantity }
                    return item;
                }),
                quantity: state.cartItems.reduce((a, b) => {
                    if (b.productId === action.payload.productId)
                        return a + action.payload.quantity
                    return a + b.quantity
                }, 0)
            };
        default:
            return state;
    }
};

export default cartReducer;