import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Routes, Route } from 'react-router-dom'
import { publicRoutes } from './routes'
import { privateRoutes } from './routes'
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { signIn } from "./actions/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const item = JSON.parse(loggedInUser);

      const now = new Date();
      const expiry = new Date(item.expiry);
      console.log(expiry)
      if (now < expiry) {
        dispatch(signIn(loggedInUser));
      }
      else {
        localStorage.removeItem('item');
      }
    }
  }, [])

  return (
    <div>
      <Header />
      <div className='pt-[73px]'>
        <ScrollToTop />
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />
          })}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />
          })}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
