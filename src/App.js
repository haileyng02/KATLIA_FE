import {Routes, Route} from 'react-router-dom'
import {publicRoutes} from './routes'
import {privateRoutes} from './routes'
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div>
      <Header/>
      <div className='pt-[73px]'>
        <ScrollToTop/>
        <Routes>
          {publicRoutes.map((route,index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page/>} />
          })}
          {privateRoutes.map((route,index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page/>} />
          })}
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
