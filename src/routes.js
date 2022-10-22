import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Account from './pages/Account';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

//Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/product/:productName', component: ProductDetail },
    { path: '/men', component: Menu },
    { path: '/cart', component: Cart },
    { path: 'signin', component: SignIn },
    { path: '/signup', component: SignUp }
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