import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Account from './pages/Account';

//Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/product/:productName', component: ProductDetail },
    { path: '/men', component: Menu },
    { path: '/cart', component: Cart }
];

//Private routes
const privateRoutes = [
    { path: '/account/profile', component: Account },
    { path: '/account/address', component: Account },
    { path: '/account/order', component: Account },
    { path: '/account/order/:orderID', component: Account },
    { path: '/account/change-password', component: Account },
];

export { publicRoutes, privateRoutes }