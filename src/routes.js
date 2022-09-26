import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail';

//Public routes
const publicRoutes = [
    {path: '/', component: Home},
    {path: '/product/:productName', component: ProductDetail}
];

//Private routes
const privateRoutes = [];

export {publicRoutes,privateRoutes}