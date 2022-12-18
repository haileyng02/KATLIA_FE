const getOrderStatus = (statusID) => {
    switch (statusID) {
        case 0:
            return "Cart";
        case 1:
            return "Ordered";
        case 2:
            return "Confirmed";
        case 3:
            return "Shipping";
        case 4:
            return "Arrived";
        case 5:
            return "Canceled";
        default:
    }
};

export default getOrderStatus;