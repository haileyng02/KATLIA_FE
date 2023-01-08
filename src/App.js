import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { notification } from "antd";
import { publicRoutes } from './routes'
import { privateRoutes } from './routes'
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { signIn } from "./actions/auth";
import MessengerCustomerChat from "react-messenger-customer-chat";

function App() {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const { notificationContent } = useSelector((state) => state.notification);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      console.log(JSON.parse(loggedInUser))
      const item = JSON.parse(loggedInUser);

      const now = new Date();
      const expiry = new Date(item.expiry);
      if (now < expiry) {
        dispatch(signIn(item));
      }
      else {
        localStorage.removeItem('user');
      }
    }
  }, [])

  useEffect(() => {
    if (notificationContent) {
      api[notificationContent.type]({
        message: notificationContent.message,
        description: notificationContent.description
      });
    }
  }, [notificationContent]);

  return (
    <div>
      <Header />
      {contextHolder}
      <div className="pt-[73px]">
        <ScrollToTop />
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={<Page {...route.props} />}
              />
            );
          })}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Routes>
      </div>
      <MessengerCustomerChat pageId="100089354018303" appId="858996148651686" />
      ,
      <Footer />
    </div>
  );
}

export default App;
