import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {publicRoutes} from './routes'
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header/>
      <Router>
        <Routes>
          {publicRoutes.map((route,index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page/>} />
          })}
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
