import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail';
import Menu from './pages/Menu';
import Cart from './pages/Cart';

//Public routes
const publicRoutes = [
    {path: '/', component: Home},
    {path: '/product/:productName', component: ProductDetail},
    {path: '/men', component: Menu},
    {path: '/cart', component: Cart}
];

//Private routes
const privateRoutes = [];

export {publicRoutes,privateRoutes}