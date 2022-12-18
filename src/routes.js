import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Account from './pages/Account';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import VerifyCode from './pages/VerifyCode';
import NewPassword from './pages/NewPassword';
import DeliveryInformation from './pages/DeliveryInformation';
import About from './pages/About';

//Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/product/:id', component: ProductDetail },
    { path: '/men/:category', component: Menu },
    { path: '/women/:category', component: Menu },
    { path: '/about', component: About },
    { path: '/cart', component: Cart },
    { path: 'signin', component: SignIn },
    { path: '/signup', component: SignUp },
    { path: '/signup/verify-code', component: VerifyCode, props: { type: 'signup' } },
    { path: '/reset-password', component: ResetPassword },
    { path: '/reset-password/verify-code', component: VerifyCode, props: { type: 'forget' } },
    { path: '/reset-password/new-password', component: NewPassword }
];

//Private routes
const privateRoutes = [
    { path: '/account/profile', component: Account },
    { path: '/account/address', component: Account },
    { path: '/account/order', component: Account },
    { path: '/account/order/:orderID', component: Account },
    { path: '/account/change-password', component: Account },
    { path: '/delivery-information', component: DeliveryInformation }
];

export { publicRoutes, privateRoutes }